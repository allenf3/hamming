using backend.Models;
using Xunit;


namespace backend.Tests;

public class HammingCodeTests
{
    [Fact]
    public void HammingCodeProperlyConverted()
    {
        var hc = new HammingCode("1011101100010001");

        Assert.Equal(2, hc.Code.Length);
        Assert.Equal(187, hc.Code[0]);
        Assert.Equal(17, hc.Code[1]);
    }

    [Fact]
    public void GetCharsWorks()
    {
        var hc = new HammingCode("1011101100010001");
        var chars = new char[] { '1', '0', '1', '1', '1', '0', '1', '1', '0', '0', '0', '1', '0', '0', '0', '1' };

        Assert.Equal(chars, hc.GetChars());
    }
}