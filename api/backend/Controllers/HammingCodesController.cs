using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using static backend.Utils.HammingUtilities;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HammingCodesController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly ILogger<HammingCodesController> _logger;

        public HammingCodesController(AppDbContext db, ILogger<HammingCodesController> logger)
        {
            _db = db;
            _logger = logger;
        }

        // GET: api/HammingCodes
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var randomHammingCode = GenerateHammingCode(2);
            randomHammingCode.ErrorType = GetRandomTransmissionErrorType();
            switch (randomHammingCode.ErrorType)
            {
                case TransmissionErrorType.OneBitFlipped:
                    var resultOfFlip = FlipOneRandomBit(randomHammingCode.Code);
                    randomHammingCode.ExerciseCode = resultOfFlip.NewByte;
                    randomHammingCode.FlippedBit = resultOfFlip.FlippedBit;
                    break;
                case TransmissionErrorType.TwoBitsFlipped:
                    randomHammingCode.ExerciseCode = FlipTwoRandomBits(randomHammingCode.Code);
                    break;
            }
            var hammingCodeExercise = new HammingCodeExercise(randomHammingCode.Id, randomHammingCode.ExerciseCode);
            try
            {
                await _db.AddAsync(randomHammingCode);
                return new OkObjectResult(hammingCodeExercise);
            }
            catch (Exception e)
            {
                _logger.LogCritical($"Unable to write to database {e}");
                throw;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Submit(Attempt attempt)
        {
            if (ModelState.IsValid)
            {
                var savedCodes = await _db.HammingCodes.ToListAsync();
                var matchedCode = savedCodes.Where(c => c.Id == attempt.TestId).FirstOrDefault();
                var attemptResponse = new AttemptResponse();
                if (matchedCode is null)
                {
                    return NotFound();
                }
                else
                {
                    if ((matchedCode.ErrorType == TransmissionErrorType.NoError && attempt.NoErrorsSelected == true) ||
                        (matchedCode.ErrorType == TransmissionErrorType.TwoBitsFlipped && attempt.TwoErorsSelected == true) ||
                        (matchedCode.ErrorType == TransmissionErrorType.OneBitFlipped && matchedCode.FlippedBit == attempt.BitSelected))
                    {
                        attemptResponse.Correct = true;
                    }

                    else
                    {
                        attemptResponse.Correct = false;
                        if (matchedCode.ErrorType == TransmissionErrorType.NoError)
                        {
                            attemptResponse.NoErrors = true;
                        }
                        else if (matchedCode.ErrorType == TransmissionErrorType.TwoBitsFlipped)
                        {
                            attemptResponse.TwoErrors = true;
                        }
                        else
                        {
                            attemptResponse.FlippedBit = matchedCode.FlippedBit;
                        }
                    }
                    return new OkObjectResult(attemptResponse);
                }
            }
            return BadRequest(new ValidationProblemDetails(ModelState));
        }
    }
}
