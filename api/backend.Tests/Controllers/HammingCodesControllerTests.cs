using Xunit;
using backend.Controllers;
using Newtonsoft.Json;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Microsoft.Extensions.Logging;
using backend.Utils;
using System.Threading.Tasks;
using System.Linq;
namespace backend.Tests.Controllers
{
    public class HammingCodesControllerTest : IAsyncLifetime
    {
        private HammingCodesController? testHcController;
        private AppDbContext? db;

        public async Task InitializeAsync()
        {
            db = await TestData.GetTestDbContext();
            testHcController = new HammingCodesController(db, new Mock<ILogger<HammingCodesController>>().Object);
        }

        public async Task DisposeAsync()
        {
            if (db is not null)
            {
                await db.DisposeAsync();
            }
        }

        public class GetHammingCode : HammingCodesControllerTest
        {
            [Fact]
            public async void Get_AddsHammingCodeToDb()
            {
                var getResponse = (OkObjectResult)await testHcController!.Get();
                Assert.Equal(200, getResponse.StatusCode);
                var hammingCodeExerciseFromGet = getResponse.Value is not null ? (HammingCodeExercise)getResponse.Value : null;
                var hammingCodeExerciseFromGetId = hammingCodeExerciseFromGet?.Id;
                Assert.NotEqual(0, hammingCodeExerciseFromGetId);
                if (db is not null)
                {
                    var matchingHammingCodeFromDatabase = db.HammingCodes.FirstOrDefault(code => code.Id == hammingCodeExerciseFromGetId);
                    Assert.NotNull(matchingHammingCodeFromDatabase);
                }
            }

            [Fact]
            public async void CorrectPost_ReturnsCorrectAttemptResponse()
            {
                var postResponse = (OkObjectResult)await testHcController!.Submit(new Attempt
                {
                    TestId = 1,
                    NoErrorsSelected = true
                });
                Assert.Equal(200, postResponse.StatusCode);
                var attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.Equal(true, attemptResponse?.Correct);
            }

            [Fact]
            public async void IncorrectPost_ReturnsIncorrectAttemptResponse()
            {
                var postResponse = (OkObjectResult)await testHcController!.Submit(new Attempt
                {
                    TestId = 1,
                    TwoErorsSelected = true
                });
                Assert.Equal(200, postResponse.StatusCode);
                var attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.Equal(false, attemptResponse?.Correct);
            }

            [Fact]
            public async void SelectedBitPost_RespondsCorrectly()
            {
                var postResponse = (OkObjectResult)await testHcController!.Submit(new Attempt
                {
                    TestId = 2,
                    BitSelected = 10
                });
                Assert.Equal(200, postResponse.StatusCode);
                var attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.Equal(true, attemptResponse?.Correct);

                postResponse = (OkObjectResult)await testHcController.Submit(new Attempt
                {
                    TestId = 2,
                    BitSelected = 3
                });
                Assert.Equal(200, postResponse?.StatusCode);
                attemptResponse = postResponse?.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.Equal(false, attemptResponse?.Correct);
                Assert.Equal(10, attemptResponse?.FlippedBit);
            }

            [Fact]
            public async void TwoErrorsPost_RespondsCorrectly()
            {
                var postResponse = (OkObjectResult)await testHcController!.Submit(new Attempt
                {
                    TestId = 3,
                    TwoErorsSelected = true
                });
                Assert.Equal(200, postResponse.StatusCode);
                var attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.Equal(true, attemptResponse?.Correct);

                postResponse = (OkObjectResult)await testHcController.Submit(new Attempt
                {
                    TestId = 3,
                    TwoErorsSelected = false
                });
                Assert.Equal(200, postResponse.StatusCode);
                attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.Equal(false, attemptResponse?.Correct);
            }
        }
    }
}