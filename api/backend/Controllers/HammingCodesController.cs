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
            var randomBytes = HammingUtilities.GetRandomBytes(2);
            HammingCode hc = new(randomBytes);
            var sb = new StringBuilder();
            for (int i = 0; i < hc.Code.Length; i++)
            {
                for (int j = 7; j >= 0; j--)
                {
                    if ((hc.Code[i] & (1 << j)) != 0)
                    {
                        sb.Append("1");
                    }
                    else
                    {
                        sb.Append("0");
                    }
                }
            }
            return sb.ToString().ToCharArray();
        }
    }
}
