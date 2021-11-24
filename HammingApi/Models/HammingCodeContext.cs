using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace HammingApi.Models
{
    public class HammingCodeContext : DbContext
    {
        public HammingCodeContext(DbContextOptions<HammingCodeContext> options) : base(options)
        {
        }
        public DbSet<HammingCodeContext> HammingCodes { get; set; } = null!;
    }
    
}