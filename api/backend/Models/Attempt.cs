using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace backend.Models
{
    public class Attempt
    {
        [Required]
        public int TestId { get; set; }
        [Range(0, 63)]
        public int BitSelected { get; set; }
        public bool NoErrorsSelected { get; set; }
        public bool TwoErorsSelected { get; set; }
    }
}