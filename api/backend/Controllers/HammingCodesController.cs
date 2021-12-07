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
        private readonly HammingCodeContext _context;

        public HammingCodesController(HammingCodeContext context)
        {
            _context = context;
        }

        // GET: api/HammingCodes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HammingCode>>> GetHammingCodes()
        {
            return await _context.HammingCodes.ToListAsync();
        }

        // GET: api/HammingCodes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HammingCode>> GetHammingCode(long id)
        {
            var hammingCode = await _context.HammingCodes.FindAsync(id);

            if (hammingCode == null)
            {
                return NotFound();
            }

            return hammingCode;
        }

        // PUT: api/HammingCodes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHammingCode(long id, HammingCode hammingCode)
        {
            if (id != hammingCode.Id)
            {
                return BadRequest();
            }

            _context.Entry(hammingCode).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HammingCodeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HammingCodes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HammingCode>> PostHammingCode(HammingCode hammingCode)
        {
            _context.HammingCodes.Add(hammingCode);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHammingCode", new { id = hammingCode.Id }, hammingCode);
        }

        // DELETE: api/HammingCodes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHammingCode(long id)
        {
            var hammingCode = await _context.HammingCodes.FindAsync(id);
            if (hammingCode == null)
            {
                return NotFound();
            }

            _context.HammingCodes.Remove(hammingCode);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HammingCodeExists(long id)
        {
            return _context.HammingCodes.Any(e => e.Id == id);
        }
    }
}
