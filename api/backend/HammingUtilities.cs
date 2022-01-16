using System;
using System.Text;
using backend.Models;

namespace backend
{
    public static class HammingUtilities
    {
        public static byte[] GetRandomBytes(int numBytes)
        {
            Random rand = new();
            var bytes = new byte[numBytes];
            rand.NextBytes(bytes);
            return bytes;
        }

        public static byte[] CalculateHammingCode(byte[] randomBytes)
        {
            if (randomBytes.Length == 2)
            {
                var groups = new[]
                {
                    new { Parity = 1, Area = new int[] { 3, 5, 7, 9, 11, 13, 15 } },
                    new { Parity = 2, Area = new int[] { 3, 6, 7, 10, 11, 14, 15 } },
                    new { Parity = 4, Area = new int[] { 5, 6, 7, 12, 13, 14, 15 } },
                    new { Parity = 8, Area = new int[] { 9, 10, 11, 12, 13, 14, 15 } },
                    new { Parity = 0, Area = new int[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15}}
                };

                int groupTotal = 0;
                bool bitIsOn = false;

                for (int i = 0; i < groups.Length; i++)
                {
                    foreach (var index in (groups[i].Area))
                    {
                        var workingByte = randomBytes[index / 8];
                        var mask = (byte)(1 << (7 - (index % 8)));
                        var placeholder = 1 << (7 - (index % 8));
                        bitIsOn = ((workingByte & mask) == placeholder);
                        groupTotal += bitIsOn ? 1 : 0;
                    }

                    var parityBitValue = (randomBytes[groups[i].Parity / 8] & (byte)(1 << 7 - (groups[i].Parity) % 8)) == 1 << 7 - (groups[i].Parity) % 8;
                    if (groupTotal % 2 == 0 && parityBitValue)
                    {
                        randomBytes[groups[i].Parity / 8] = (byte)(randomBytes[groups[i].Parity / 8] ^ (1 << (7 - (groups[i].Parity % 8))));

                    }
                    else if (groupTotal % 2 == 1 && !parityBitValue)
                    {
                        randomBytes[groups[i].Parity / 8] = (byte)(randomBytes[groups[i].Parity / 8] ^ (1 << (7 - (groups[i].Parity % 8))));
                    }

                    groupTotal = 0;
                }
            }
            return randomBytes;
        }

        public static HammingCode GenerateHammingCode(int numBytes)
        {
            var randomBytes = GetRandomBytes(numBytes);
            var correctedBytes = CalculateHammingCode(randomBytes);
            HammingCode hc = new(correctedBytes);
            return hc;
        }

        public static char[] CodeToCharArray(byte[] hammingCode)
        {
            var sb = new StringBuilder();
            for (int i = 0; i < hammingCode.Length; i++)
            {
                for (int j = 7; j >= 0; j--)
                {
                    if ((hammingCode[i] & (1 << j)) != 0)
                    {
                        sb.Append("1");
                    }
                    else
                    {
                        sb.Append("0");
                    }
                }
            }
            return sb.ToString().ToCharArray();
        }

    }
}