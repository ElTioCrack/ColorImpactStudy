using Entities;
using DAL.DbContext;
using DAL.Interfaces;
using Firebase.Database;
using Firebase.Database.Query;

namespace DAL.Repositories
{
	/// <summary>
	/// Implementación del repositorio de UserData que interactúa con Firebase Realtime Database.
	/// </summary>
	public class UserDataRepository : IUserDataRepository
	{
		private readonly FirebaseDbContext _firebaseDbContext;

		public UserDataRepository(FirebaseDbContext firebaseDbContext)
		{
			_firebaseDbContext = firebaseDbContext ?? throw new ArgumentNullException(nameof(firebaseDbContext));
		}

		/// <summary>
		/// Obtiene una lista de todos los UserData desde Firebase.
		/// </summary>
		/// <returns>Una lista de UserData.</returns>
		public async Task<List<UserData>> GetAllUserDataAsync()
		{
			var userDataCollection = await _firebaseDbContext.GetClient().Child("UserData").OnceAsync<UserData>();
			var userDataList = new List<UserData>();

			foreach (var userDataSnapshot in userDataCollection)
			{
				var userData = userDataSnapshot.Object;
				userData.Id = userDataSnapshot.Key;
				userDataList.Add(userData);
			}

			return userDataList;
		}

		/// <summary>
		/// Obtiene UserData por su identificador único desde Firebase.
		/// </summary>
		/// <param name="id">El identificador único del UserData.</param>
		/// <returns>El UserData correspondiente al ID o null si no se encuentra.</returns>
		public async Task<UserData> GetUserDataByIdAsync(string id)
		{
			try
			{
				var userData = await _firebaseDbContext.GetClient().Child("UserData").Child(id).OnceSingleAsync<UserData>();
				userData.Id = id;
				return userData;
			}
			catch (Exception)
			{
				return null;
			}
		}

		/// <summary>
		/// Agrega un nuevo UserData a Firebase.
		/// </summary>
		/// <param name="userData">El UserData a agregar.</param>
		/// <returns>El UserData agregado con su ID asignado.</returns>
		public async Task<UserData> AddUserDataAsync(UserData userData)
		{
			var result = await _firebaseDbContext.GetClient().Child("UserData").PostAsync(userData);
			return await GetUserDataByIdAsync(result.Key);
		}

		/// <summary>
		/// Actualiza un UserData existente en Firebase.
		/// </summary>
		/// <param name="id">El ID del UserData a actualizar.</param>
		/// <param name="userData">El UserData actualizado.</param>
		/// <returns>True si la actualización es exitosa, False si falla.</returns>
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

		/// <summary>
		/// Elimina un UserData de Firebase por su ID.
		/// </summary>
		/// <param name="id">El ID del UserData a eliminar.</param>
		/// <returns>True si la eliminación es exitosa, False si falla.</returns>
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
