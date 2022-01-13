using backend.Models;
using Xunit;


namespace backend.Tests
{

    public class HammingUtilitiesTests
    {
        [Fact]
        public void GetRandomBytes_GeneratesRandomByteArray()
        {
            var randomBytes = HammingUtilities.GetRandomBytes(2);
            Assert.Equal(2, randomBytes.Length);
        }

        [Fact]
        public void CalculateHammingCode_ProperlyAdjustsBits()
        {
            var myBytes = new byte[] { 172, 127 };
            var calculated = HammingUtilities.CalculateHammingCode(myBytes);

            Assert.Equal(204, calculated[0]);
            Assert.Equal(255, calculated[1]);
        }
    }
}