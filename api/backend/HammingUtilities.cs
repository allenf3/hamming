using System;

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
    }
}