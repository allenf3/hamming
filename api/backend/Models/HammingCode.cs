using System;
using System.Text;

namespace backend.Models
{
    public class HammingCode
    {
        public Byte[] Code { get; set; }

        public HammingCode(byte[] bytes)
        {
            if (checkCode(bytes))
            {
                Code = bytes;
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