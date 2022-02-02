using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace backend.Models
{
    public class Attempt
    {
        public int AttemptId { get; set; }

        [Required]
        public int ExerciseId { get; set; }
        [Range(0, 63)]
        public int? BitSelected { get; set; }
        public bool NoErrorsSelected { get; set; }
        public bool TwoErrorsSelected { get; set; }

        [JsonPropertyName("UserEmail")]
        public string User { get; set; }
        public bool Correct { get; set; }
        public DateTime SubmittedOn { get; set; }

    }
}