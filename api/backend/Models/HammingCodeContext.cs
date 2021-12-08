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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HammingCode>().HasData(new HammingCode { Id = 1, Code = "01010101" });
        }
    }
    
}