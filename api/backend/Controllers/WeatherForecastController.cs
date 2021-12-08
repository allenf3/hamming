using System;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HammingApi.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private readonly HammingCodeContext _db;
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(HammingCodeContext db, ILogger<WeatherForecastController> logger)
    {
        _db = db;
        _logger = logger;
    }
    
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        HammingCode? hammingCode = null;

        try
        {
            hammingCode = await _db.HammingCodes.FirstOrDefaultAsync();
        }
        catch (Exception e)
        {
            _logger.LogCritical($"SQL Read error. It is likely that there is no database connection established. {e.Message}");
            throw;
        }

        if (hammingCode == null)
        {
            return new NotFoundResult();
        }

        return new OkObjectResult(hammingCode);
    }
}
