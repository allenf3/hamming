using System;
using System.Linq;
using backend.Models;
using Xunit;
using static backend.HammingUtilities;


namespace backend.Tests
{

    public class HammingUtilitiesTests
    {
        [Fact]
        public void GetRandomBytes_GeneratesRandomByteArray()
        {
            var randomBytes = GetRandomBytes(2);
            Assert.Equal(2, randomBytes.Length);
        }

        [Fact]
        public void CalculateHammingCode_ProperlyAdjustsBits()
        {
            var myBytes = new byte[] { 172, 127 };
            var calculated = CalculateHammingCode(myBytes);
            Assert.Equal(204, calculated[0]);
            Assert.Equal(255, calculated[1]);

            myBytes[0] = 75;
            myBytes[1] = 178;
            calculated = CalculateHammingCode(myBytes);
            Assert.Equal(43, calculated[0]);
            Assert.Equal(178, calculated[1]);

            myBytes[0] = 18;
            myBytes[1] = 233;
            calculated = CalculateHammingCode(myBytes);
            Assert.Equal(90, calculated[0]);
            Assert.Equal(105, calculated[1]);
        }

        [Fact]
        public void GenerateHammingCode_ReturnsByteArray()
        {
            var testHc = GenerateHammingCode(2);

            Assert.Equal(2, testHc.Code.Length);
        }

        [Fact]
        public void FlipOneBit_FlipsCorrectBit()
        {
            var sampleByte = (byte)127;
            var sampleByteBitFlipped = FlipOneBit(sampleByte, 0);
            Assert.Equal(255, sampleByteBitFlipped);

            sampleByte = (byte)1;
            sampleByteBitFlipped = FlipOneBit(sampleByte, 7);
            Assert.Equal(0, sampleByteBitFlipped);

            sampleByte = (byte)241;
            sampleByteBitFlipped = FlipOneBit(sampleByte, 2);
            Assert.Equal(209, sampleByteBitFlipped);
        }

        [Fact]
        public void FlipOneRandomBit_ChangesByteArray()
        {
            var controlBytes = new byte[] { 193 };
            var testBytes = new byte[] { 193 };
            testBytes = FlipOneRandomBit(testBytes);
            var controlSetBits = CountSetBits(controlBytes[0]);
            var testSetBits = CountSetBits(testBytes[0]);
            Assert.NotEqual(controlBytes, testBytes);
            Assert.Equal(1, Math.Abs(controlSetBits - testSetBits));

            controlBytes = new byte[] { 17, 204 };
            testBytes = new byte[] { 17, 204 };
            testBytes = FlipOneRandomBit(testBytes);
            controlSetBits = CountSetBits(controlBytes[0]) + CountSetBits(controlBytes[1]);
            testSetBits = CountSetBits(testBytes[0]) + CountSetBits(testBytes[1]);
            Assert.NotEqual(controlBytes, testBytes);
            Assert.Equal(1, Math.Abs(controlSetBits - testSetBits));
        }

        [Fact]
        public void CountSetBits_GivesCorrectCount()
        {
            var testByte = (byte)255;
            var setBitsInTestByte = CountSetBits(testByte);
            Assert.Equal(8, setBitsInTestByte);

            testByte = (byte)1;
            setBitsInTestByte = CountSetBits(testByte);
            Assert.Equal(1, setBitsInTestByte);

            testByte = (byte)113;
            setBitsInTestByte = CountSetBits(testByte);
            Assert.Equal(4, setBitsInTestByte);
        }
    }
}