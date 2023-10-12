using DAL.DbContext;
using DAL.Interfaces;
using Entities;
using Firebase.Database;
using Firebase.Database.Query;

namespace DAL.Repositories
{
	public class UserDataRepository : IUserDataRepository
	{
		private readonly FirebaseDbContext _firebaseDbContext;

		public UserDataRepository(FirebaseDbContext firebaseDbContext)
		{
			_firebaseDbContext = firebaseDbContext ?? throw new ArgumentNullException(nameof(firebaseDbContext));
		}

		public async Task<List<UserData>> GetAllUserDataAsync()
		{
			var userDataCollection = await _firebaseDbContext.GetClient().Child("UserData").OnceAsync<UserData>();
			return userDataCollection.Select(u => u.Object).ToList();
		}

		public async Task<UserData> GetUserDataByIdAsync(string id)
		{
			var userData = await _firebaseDbContext.GetClient().Child("UserData").Child(id).OnceSingleAsync<UserData>();
			return userData;
		}

		public async Task<UserData> AddUserDataAsync(UserData userData)
		{
			var result = await _firebaseDbContext.GetClient().Child("UserData").PostAsync(userData);
			return await GetUserDataByIdAsync(result.Key);
		}

		public async Task<bool> UpdateUserDataAsync(string id, UserData userData)
		{
			try
			{
				await _firebaseDbContext.GetClient().Child("UserData").Child(id).PutAsync(userData);
				return true;
			}
			catch (Exception)
			{
				return false;
			}
		}

		public async Task<bool> DeleteUserDataAsync(string id)
		{
			try
			{
				await _firebaseDbContext.GetClient().Child("UserData").Child(id).DeleteAsync();
				return true;
			}
			catch (Exception)
			{
				return false;
			}
		}
	}
}
