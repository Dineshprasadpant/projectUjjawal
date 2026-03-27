using Backend;
using Dapper;
using Backend.Dtos;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

[ApiController]
[Route("api/[controller]")]
public class HospitalsController(DapperContext context) : ControllerBase
{

    [HttpPost]
    public async Task<IActionResult> CreateHospital([FromBody] CreateHospitalDto dto)
    {
        using var connection = context.CreateConnection();

        const string sql = @"
            INSERT INTO Hospitals (Name, Address, Location)
            VALUES (@Name, @Address, geography::Point(@Latitude, @Longitude, 4326));";

        await connection.ExecuteAsync(sql, dto);

        return Ok(new { message = "Hospital added successfully" });
    }
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        using var connection = context.CreateConnection();
        var query = "SELECT Id, Name, Address, Location.Lat AS Latitude, Location.Long AS Longitude FROM Hospitals;";
        var result = await connection.QueryAsync<Hospital>(query);
        return Ok(result);
    }


    [HttpGet("nearby")]
    public async Task<ActionResult<IEnumerable<Hospital>>> GetNearby(
        [FromQuery] double lat,
        [FromQuery] double lon,
        [FromQuery] double radiusMeters = 5000)
    {
        using var connection = context.CreateConnection();

        const string sql = @"
            SELECT 
                Id, 
                Name, 
                Address, 
                Location.Lat AS Latitude, 
                Location.Long AS Longitude,
                Location.STDistance(geography::Point(@lat, @lon, 4326)) AS DistanceInMeters
            FROM Hospitals
            WHERE Location.STDistance(geography::Point(@lat, @lon, 4326)) <= @radiusMeters
            ORDER BY DistanceInMeters ASC";

        var hospitals = await connection.QueryAsync<Hospital>(sql, new { lat, lon, radiusMeters });

        return Ok(hospitals);
    }

}