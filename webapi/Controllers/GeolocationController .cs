using Entities;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/geolocation")]
	public class GeolocationController : ControllerBase
	{
		[HttpGet]
		[Route("userlocation")]
		public async Task<IActionResult> GetUserLocation()
		{
			try
			{
				// Obtiene la dirección IP del usuario desde la solicitud
				string userIpAddress = HttpContext.Connection.RemoteIpAddress.ToString();
				//userIpAddress = "177.222.61.200";

				// Consulta el servicio de ipinfo.io para obtener información de geolocalización
				string apiUrl = $"https://ipinfo.io/{userIpAddress}/json";
				using (var client = new HttpClient())
				{
					var response = await client.GetStringAsync(apiUrl);

					// Deserializa la respuesta JSON en un objeto UserData
					var userData = JsonSerializer.Deserialize<LocationData>(response);

					return Ok(userData);
				}
			}
			catch (Exception ex)
			{
				// Maneja errores según sea necesario.
				return StatusCode(500, new { Error = "Error al obtener la información de geolocalización." });
			}
		}
	}
}
