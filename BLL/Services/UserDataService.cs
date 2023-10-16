using Entities;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL.Services
{
	public class UserDataService : IUserDataService
	{
		private readonly IUserDataRepository _userDataRepository;

		public UserDataService(IUserDataRepository userDataRepository)
		{
			_userDataRepository = userDataRepository ?? throw new ArgumentNullException(nameof(userDataRepository));
		}

		public async Task<List<UserData>> GetAllUserDataAsync()
		{
			return await _userDataRepository.GetAllUserDataAsync();
		}

		public async Task<UserData> GetUserDataByIdAsync(string id)
		{
			if (string.IsNullOrEmpty(id))
			{
				throw new ArgumentException("El ID no puede estar vacío.");
			}

			return await _userDataRepository.GetUserDataByIdAsync(id);
		}

		public async Task<UserData> AddUserDataAsync(UserData userData)
		{
			ValidateUserData(userData);

			userData.AccessTime = userData.AccessTime.AddHours(-4);

			return await _userDataRepository.AddUserDataAsync(userData);
		}

		public async Task<bool> UpdateUserDataAsync(string id, UserData userData)
		{
			if (string.IsNullOrEmpty(id))
			{
				throw new ArgumentException("El ID no puede estar vacío.");
			}

			ValidateUserData(userData);

			return await _userDataRepository.UpdateUserDataAsync(id, userData);
		}

		public async Task<bool> DeleteUserDataAsync(string id)
		{
			if (string.IsNullOrEmpty(id))
			{
				throw new ArgumentException("El ID no puede estar vacío.");
			}

			return await _userDataRepository.DeleteUserDataAsync(id);
		}

		private void ValidateUserData(UserData userData)
		{
			if (userData == null)
			{
				throw new ArgumentNullException(nameof(userData), "Los datos del usuario no pueden ser nulos.");
			}

			if (string.IsNullOrWhiteSpace(userData.Phrase))
			{
				throw new ArgumentException("La frase es un campo obligatorio.");
			}

			if (string.IsNullOrWhiteSpace(userData.UserIpAddress))
			{
				throw new ArgumentException("La dirección IP del usuario es un campo obligatorio.");
			}
		}
	}
}
