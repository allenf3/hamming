using System;
using System.Text;
using static backend.HammingUtilities;

namespace backend.Models
{
    public class HammingCode
    {
        public Guid Id { get; init; }
        public Byte[] Code { get; set; }
        public Byte[] TestCode { get; set; }
        public Char[]? TestCodeCharArray { get; set; }
        public TransmissionErrorType? ErrorType { get; set; }
        public int? FlippedBit { get; set; }

        public HammingCode(byte[] bytes)
        {
            if (checkCode(bytes))
            {
                Code = bytes;
                Id = new Guid();
                TestCode = (Byte[])Code.Clone();
            }
            else
            {
                throw new Exception();
            }
        }

        private bool checkCode(byte[] code)
        {
            var len = code.Length;
            if (len > 0)
            {
                return true;
            }
            return false;
        }
    }
}