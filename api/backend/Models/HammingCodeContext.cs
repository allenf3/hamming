using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace backend.Models
{
    public class HammingCodeContext : DbContext
    {
        public HammingCodeContext(DbContextOptions<HammingCodeContext> options) : base(options)
        {
        }
        public DbSet<HammingCode> HammingCodes { get; set; } = null!;

        
    }
    
}