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
                    ExerciseId = 1,
                    NoErrorsSelected = true
                });
                Assert.Equal(200, postResponse.StatusCode);
                var attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.True(attemptResponse?.Correct);
            }

            [Fact]
            public async void IncorrectPost_ReturnsIncorrectAttemptResponse()
            {
                var postResponse = (OkObjectResult)await testHcController!.Submit(new Attempt
                {
                    ExerciseId = 1,
                    TwoErrorsSelected = true
                });
                Assert.Equal(200, postResponse.StatusCode);
                var attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.False(attemptResponse?.Correct);
            }

            [Fact]
            public async void SelectedBitPost_RespondsCorrectly()
            {
                var postResponse = (OkObjectResult)await testHcController!.Submit(new Attempt
                {
                    ExerciseId = 2,
                    BitSelected = 10
                });
                Assert.Equal(200, postResponse.StatusCode);
                var attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.True(attemptResponse?.Correct);

                postResponse = (OkObjectResult)await testHcController.Submit(new Attempt
                {
                    ExerciseId = 2,
                    BitSelected = 3
                });
                Assert.Equal(200, postResponse?.StatusCode);
                attemptResponse = postResponse?.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.False(attemptResponse?.Correct);
                Assert.Equal(10, attemptResponse?.FlippedBit);
            }

            [Fact]
            public async void TwoErrorsPost_RespondsCorrectly()
            {
                var postResponse = (OkObjectResult)await testHcController!.Submit(new Attempt
                {
                    ExerciseId = 3,
                    TwoErrorsSelected = true
                });
                Assert.Equal(200, postResponse.StatusCode);
                var attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.True(attemptResponse?.Correct);

                postResponse = (OkObjectResult)await testHcController.Submit(new Attempt
                {
                    ExerciseId = 3,
                    TwoErrorsSelected = false
                });
                Assert.Equal(200, postResponse.StatusCode);
                attemptResponse = postResponse.Value is not null ? (AttemptResponse)postResponse.Value : null;
                Assert.Equal(false, attemptResponse?.Correct);
            }

            [Fact]
            public async void AttemptWrittenToDatabase()
            {
                var postResponse = (OkObjectResult)await testHcController!.Submit(new Attempt
                {
                    ExerciseId = 3,
                    TwoErrorsSelected = true,
                    UserId = "auth0|8589"
                });
                Assert.Equal(200, postResponse.StatusCode);
                if (db is not null)
                {
                    var attempt = db.Attempts.FirstOrDefault(attempt => attempt.UserId == "auth0|8589");
                    Assert.NotNull(attempt);
                    Assert.Null(attempt!.ActualBit);
                    Assert.True(attempt.ActualTwoErrors);
                    Assert.False(attempt.ActualNoErrors);
                }
            }
        }
    }
}