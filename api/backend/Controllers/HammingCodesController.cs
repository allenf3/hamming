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

namespace bakend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HammingCodesController : ControllerBase
    {
        // GET: api/HammingCodes
        [HttpGet]
        public string GetRandomHammingCode()
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
            string json = JsonConvert.SerializeObject(randomHammingCode);
            return json;
        }
    }
}
