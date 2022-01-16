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

namespace bakend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HammingCodesController : ControllerBase
    {
        // GET: api/HammingCodes
        [HttpGet]
        public char[] GetRandomHammingCode()
        {
            var randomHammingCode = HammingUtilities.GenerateHammingCode(2);
            var randomHammingCodeCharArray = HammingUtilities.CodeToCharArray(randomHammingCode.Code);
            return randomHammingCodeCharArray;
        }
    }
}
