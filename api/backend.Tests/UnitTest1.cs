using backend.Models;
using Xunit;


namespace backend.Tests;

public class UnitTest1
{
    [Fact]
    public void HammingCodeProperlyConverted()
    {
        var hc = new HammingCode("1011101100010001");

        Assert.Equal(2, hc.Code.Length);
        Assert.Equal(187, hc.Code[0]);
        Assert.Equal(17, hc.Code[1]);
    }
}