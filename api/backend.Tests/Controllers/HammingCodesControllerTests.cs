using Xunit;
using backend.Controllers;
using Newtonsoft.Json;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Tests.Controllers
{
    public class HammingCodesControllerTest
    {
        private HammingCodesController testHcController = new HammingCodesController();

        public class GetHammingCode : HammingCodesControllerTest
        {
            [Fact]
            public void Get_ReturnsSuccess()
            {
                var response = testHcController.Get() as OkObjectResult;
                Assert.NotNull(response);
                Assert.Equal(200, response!.StatusCode);
            }
        }
    }
}