using Entities;

namespace DAL.Interfaces
{
	public interface IUserDataRepository
	{
		Task<List<UserData>> GetAllUserDataAsync();
		Task<UserData> GetUserDataByIdAsync(string id);
		Task<UserData> AddUserDataAsync(UserData userData);
		Task<bool> UpdateUserDataAsync(string id, UserData userData);
		Task<bool> DeleteUserDataAsync(string id);
	}
}
