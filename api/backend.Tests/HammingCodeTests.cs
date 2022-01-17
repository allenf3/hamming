using System;
using backend.Models;
using Xunit;


namespace backend.Tests;

public class HammingCodeTests
{
    [Fact]
    public void HammingCodeInitializedWithZeroBytes_ThrowsException()
    {
        Assert.Throws<Exception>(() => new HammingCode(new byte[0]));
    }
}