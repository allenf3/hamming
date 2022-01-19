namespace backend.Models
{
    public class AttemptResponse
    {
        public bool Correct { get; set; }
        public int FlippedBit { get; set; }
        public bool NoErrors { get; set; }
        public bool TwoErrors { get; set; }
    }
}