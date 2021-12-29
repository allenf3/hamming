using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace bakend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HammingCodesController : ControllerBase
    {
        // GET: api/HammingCodes
        [HttpGet]
        public HammingCode GetRandomHammingCode()
        {
            return new HammingCode("1011101100010001");
        }
    }
}
