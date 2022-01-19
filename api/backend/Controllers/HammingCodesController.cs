using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.ComponentModel;
using System.Collections;
using System.Text;
using backend;
using static backend.HammingUtilities;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HammingCodesController : ControllerBase
    {
        public List<HammingCode> OutstandingCodes = new();

        // GET: api/HammingCodes
        [HttpGet]
        public IActionResult Get()
        {
            var randomHammingCode = GenerateHammingCode(2);
            randomHammingCode.ErrorType = GetRandomTransmissionErrorType();
            switch (randomHammingCode.ErrorType)
            {
                case TransmissionErrorType.OneBitFlipped:
                    var resultOfFlip = FlipOneRandomBit(randomHammingCode.Code);
                    randomHammingCode.TestCode = resultOfFlip.NewByte;
                    randomHammingCode.FlippedBit = resultOfFlip.FlippedBit;
                    break;
                case TransmissionErrorType.TwoBitsFlipped:
                    randomHammingCode.TestCode = FlipTwoRandomBits(randomHammingCode.Code);
                    break;
            }
            randomHammingCode.TestCodeCharArray = CodeToCharArray(randomHammingCode.TestCode);
            return new OkObjectResult(randomHammingCode);
        }

        [HttpPost]
        public IActionResult Submit(Attempt attempt)
        {
            if (ModelState.IsValid)
            {
                var matchedCode = OutstandingCodes.Where(c => c.Id.ToString() == attempt.TestId).FirstOrDefault();
                var attepmtResponse = new AttemptResponse();
                if (matchedCode is null)
                {
                    return NotFound();
                }
                else
                {
                    if (matchedCode.ErrorType == TransmissionErrorType.NoError && attempt.NoErrorsSelected == true)
                    {
                        return Ok("Correct");
                    }
                    if (matchedCode.ErrorType == TransmissionErrorType.TwoBitsFlipped && attempt.TwoErorsSelected == true)
                    {
                        return Ok("Correct");
                    }
                    if (matchedCode.ErrorType == TransmissionErrorType.OneBitFlipped && matchedCode.FlippedBit == attempt.BitSelected)
                    {
                        return Ok("Correct");
                    }
                    else
                    {
                        return Ok("Incorrect");
                    }
                }
            }
            return BadRequest(new ValidationProblemDetails(ModelState));
        }
    }
}
