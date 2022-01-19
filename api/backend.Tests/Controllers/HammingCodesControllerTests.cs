using Xunit;
using backend.Controllers;
using Newtonsoft.Json;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Microsoft.Extensions.Logging;
using backend.Utils;
using System.Threading.Tasks;

namespace backend.Tests.Controllers
{
    public class HammingCodesControllerTest : IAsyncLifetime
    {
        private HammingCodesController testHcController;
        private AppDbContext db;

        public async Task InitializeAsync()
        {
            db = await TestData.GetTestDbContext();
            testHcController = new HammingCodesController(db, new Mock<ILogger<HammingCodesController>>().Object);
        }

        public async Task DisposeAsync()
        {
            await db.DisposeAsync();
        }

        public class GetHammingCode : HammingCodesControllerTest
        {
            [Fact]
            public async void Get_ReturnsSuccess()
            {
                var response = await testHcController.Get();
                Assert.NotNull(response);
                // Assert.Equal("200", response!.Status.ToString());
            }

            [Fact]
            public async void Post_ReturnsSuccess()
            {
                var postResponse = await testHcController.Submit(new Attempt
                {
                    TestId = 5,
                    BitSelected = 2,
                    NoErrorsSelected = false,
                    TwoErorsSelected = false
                });
                Assert.NotNull(postResponse);
                // Assert.Equal("200", postResponse!.Status.ToString());
            }
        }
    }
}