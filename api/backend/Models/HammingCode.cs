using System;
namespace backend.Models
{
    public class HammingCode
    {
        public long Id { get; set; }
        public Byte[] Code { get; set; }

        public HammingCode(string code)
        {
            if (checkCode(code))
            {
                Code = convertCodeToBytes(code);
            }
            else
            {
                throw new Exception();
            }
        }

        private Byte[] convertCodeToBytes(string bitsToConvert)
        {
            var code = new Byte[bitsToConvert.Length / 8];
            for (int i = 0; i < bitsToConvert.Length / 8; i++)
            {
                code[i] = convertOneByte(bitsToConvert.Substring(i * 8, 8));
            }
            return code;
        }

        private byte convertOneByte(string eightBits)
        {
            int adder = 128;
            int total = 0;
            for (int i = 0; i < 8; i++)
            {
                if (eightBits[i] == '1')
                {
                    total += adder;
                }
                adder /= 2;
            }
            byte converted = Convert.ToByte(total);
            return converted;
        }

        private bool checkCode(string code)
        {
            var len = code.Length;
            if (len != 16 && len != 64)
            {
                return false;
            }

            foreach (char c in code)
            {
                if (c != '0' && c != '1')
                {
                    return false;
                }
            }
            return true;
        }

    }
}