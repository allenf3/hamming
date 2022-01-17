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

                    var workingBit = groups[i].Parity;
                    var parityBitValue = (randomBytes[workingBit / 8] & (byte)(1 << 7 - workingBit % 8)) == 1 << 7 - workingBit % 8;
                    if (groupTotal % 2 == 0 && parityBitValue)
                    {
                        randomBytes[workingBit / 8] = FlipOneBit(randomBytes[workingBit / 8], workingBit % 8);
                    }
                    else if (groupTotal % 2 == 1 && !parityBitValue)
                    {
                        randomBytes[workingBit / 8] = FlipOneBit(randomBytes[workingBit / 8], workingBit % 8);
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

        public static byte FlipOneBit(byte bits, int bitToFlip)
        {
            bits = (byte)((byte)(1 << (7 - bitToFlip)) ^ bits);
            return bits;
        }

        public static (byte[] NewByte, int FlippedBit) FlipOneRandomBit(byte[] bytes)
        {
            var byteSelector = new Random().Next(bytes.Length);
            var bitSelector = new Random().Next(8);
            bytes[byteSelector] = FlipOneBit(bytes[byteSelector], bitSelector);
            return (bytes, bitSelector + (8 * byteSelector));
        }

        public static byte[] FlipTwoRandomBits(byte[] bytes)
        {
            var rand = new Random();
            var bitOne = rand.Next(bytes.Length * 8);
            var bitTwo = bitOne;
            while (bitTwo == bitOne)
            {
                bitTwo = rand.Next(bytes.Length * 8);
            }
            bytes[bitOne / 8] = FlipOneBit(bytes[bitOne / 8], bitOne % 8);
            bytes[bitTwo / 8] = FlipOneBit(bytes[bitTwo / 8], bitTwo % 8);
            return bytes;
        }

        public enum TransmissionErrorType
        {
            NoError,
            OneBitFlipped,
            TwoBitsFlipped
        }

        public static TransmissionErrorType GetRandomTransmissionErrorType()
        {
            var rand = new Random();
            switch (rand.Next(3))
            {
                case 0:
                    return TransmissionErrorType.NoError;
                case 1:
                    return TransmissionErrorType.OneBitFlipped;
                case 2:
                    return TransmissionErrorType.TwoBitsFlipped;
                default:
                    throw new Exception();
            }
        }

        public static int CountSetBits(byte bits)
        {
            return Convert.ToString(bits, 2).ToCharArray().Count(c => c == '1');
        }
    }
}