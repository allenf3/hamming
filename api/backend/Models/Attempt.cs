using Newtonsoft.Json;

namespace backend.Models
{
    public class Attempt
    {
        [JsonProperty("testId")]
        public string? TestId { get; set; }

        [JsonProperty("bitSelected")]
        public int BitSelected { get; set; }

        [JsonProperty("noErrorsSelected")]
        public bool NoErrorsSelected { get; set; }

        [JsonProperty("twoErrorsSelected")]
        public bool TwoErorsSelected { get; set; }

        public bool Correct { get; set; }
    }
}