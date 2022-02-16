using System;
using System.ComponentModel.DataAnnotations;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AttemptsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<AttemptsController> _logger;

    public AttemptsController(AppDbContext db, ILogger<AttemptsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> GetByUser(string userId)
    {
        try
        {
            var userAttempts = await _db.Attempts.Where(a => a.UserId == userId).ToListAsync();
            return userAttempts.Count > 0 ? new OkObjectResult(userAttempts) : new NotFoundResult();
        }
        catch (Exception e)
        {
            _logger.LogCritical($"SQL Read error. There may be a problem with the database connection. ${e.Message}");
            throw;
        }
    }
}