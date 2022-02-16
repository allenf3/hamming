using Xunit;
using backend.Controllers;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Moq;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using FluentAssertions;
using System.Collections.Generic;
using System;

namespace backend.Tests.Controllers;

public class AttemptsControllerTest : IAsyncLifetime
{
    private AttemptsController? attemptsController;
    private AppDbContext? db;

    public async Task InitializeAsync()
    {
        db = await TestData.GetTestDbContext();
        attemptsController = new AttemptsController(db, new Mock<ILogger<AttemptsController>>().Object);
    }

    public async Task DisposeAsync()
    {
        if (db is not null)
        {
            await db.DisposeAsync();
        }
    }

    public class GetByUser : AttemptsControllerTest
    {
        [Fact]
        public async void WhenUserHasAttempts_ReturnsAttempts()
        {
            var response = (OkObjectResult)await attemptsController!.GetByUser(TestData.TEST_USER);
            var userAttempts = response.Value as List<Attempt>;
            userAttempts!.Count.Should().Be(3);
        }

        [Fact]
        public async void WhenUserHasNoAttempts_ReturnsNotFound()
        {
            var response = await attemptsController!.GetByUser("auth0|87543925423");
            response.Should().BeOfType<NotFoundResult>();
        }

        [Fact]
        public async void WhenAnErrorOccursUsingDatabase_ThrowsError()
        {
            var mockDb = new Mock<AppDbContext>();
            mockDb.Setup(x => x.Attempts).Throws(new System.Exception("Something went wrong"));
            var attemptsController = new AttemptsController(mockDb.Object, new Mock<ILogger<AttemptsController>>().Object);

            var exception = await Assert.ThrowsAsync<Exception>(() => attemptsController.GetByUser("auth0|4355"));

            exception.Message.Should().Be("Something went wrong");
        }
    }
}

