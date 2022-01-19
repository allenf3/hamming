using System;
using System.Text;
using static backend.Utils.HammingUtilities;

namespace backend.Models
{
    public class HammingCode
    {
        public int Id { get; init; }
        public Byte[] Code { get; set; }
        public Byte[] ExerciseCode { get; set; }
        public TransmissionErrorType? ErrorType { get; set; }
        public int? FlippedBit { get; set; }

        public HammingCode() { }
        public HammingCode(byte[] bytes)
        {
            Code = bytes;
            ExerciseCode = (Byte[])Code.Clone();
        }
    }
}