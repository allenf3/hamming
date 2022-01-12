using backend.Models;
using Xunit;


namespace backend.Tests
{

    public class HammingUtilitiesTests
    {
        [Fact]
        public void GetRandomBytesGeneratesRandomByteArray()
        {
            var randomBytes = HammingUtilities.GetRandomBytes(2);
            Assert.Equal(2, randomBytes.Length);
        }
    }
}