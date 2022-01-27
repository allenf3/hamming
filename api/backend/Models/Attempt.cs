using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace backend.Models
{
    public class Attempt
    {
        [Required]
        public int ExerciseId { get; set; }
        [Range(0, 63)]
        public int? BitSelected { get; set; }
        public bool NoErrorsSelected { get; set; }
        public bool TwoErrorsSelected { get; set; }
    }
}