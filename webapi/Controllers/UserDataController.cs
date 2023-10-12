using Entities;
using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class UserDataController : ControllerBase
{
	private readonly IUserDataService _userDataService;

	public UserDataController(IUserDataService userDataService)
	{
		_userDataService = userDataService ?? throw new ArgumentNullException(nameof(userDataService));
	}

	[HttpGet]
	public async Task<IActionResult> GetAllUserData()
	{
		var allUserData = await _userDataService.GetAllUserDataAsync();
		return Ok(allUserData);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetUserDataById(string id)
	{
		var userData = await _userDataService.GetUserDataByIdAsync(id);

		if (userData == null)
		{
			return NotFound();
		}

		return Ok(userData);
	}

	[HttpPost]
	public async Task<IActionResult> AddUserData([FromBody] UserData userData)
	{
		if (userData == null)
		{
			return BadRequest("Invalid data");
		}

		var addedUserData = await _userDataService.AddUserDataAsync(userData);

		return CreatedAtAction(nameof(GetUserDataById), new { id = addedUserData.Id }, addedUserData);
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateUserData(string id, [FromBody] UserData userData)
	{
		if (userData == null)
		{
			return BadRequest("Invalid data");
		}

		var updated = await _userDataService.UpdateUserDataAsync(id, userData);

		if (!updated)
		{
			return NotFound();
		}

		return NoContent();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteUserData(string id)
	{
		var deleted = await _userDataService.DeleteUserDataAsync(id);

		if (!deleted)
		{
			return NotFound();
		}

		return NoContent();
	}
}
