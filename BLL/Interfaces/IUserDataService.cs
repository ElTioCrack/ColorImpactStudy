using Entities;

namespace BLL.Interfaces
{
	public interface IUserDataService
	{
		Task<List<UserData>> GetAllUserDataAsync();
		Task<UserData> GetUserDataByIdAsync(string id);
		Task<UserData> AddUserDataAsync(UserData userData);
		Task<bool> UpdateUserDataAsync(string id, UserData userData);
		Task<bool> DeleteUserDataAsync(string id);
	}
}
