using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Firebase.Database;
using Firebase.Database.Query;
using System.Collections.Generic;
using System;

namespace DAL.DbContext
{
	public class FirebaseDbContext
	{
        private FirebaseClient _firebaseClient;

        public FirebaseDbContext(string pathToCredentialsFile, string firebaseUrl)
        {
            if (FirebaseApp.DefaultInstance == null)
            {
				string credentialsPath = Path.Combine(Directory.GetCurrentDirectory(), "colorlmpactstudy-firebase-adminsdk-zr64q-7372257016.json");
				
                string credentialsFile;


				if (File.Exists(credentialsPath))
				{
					credentialsFile = credentialsPath;
				}
				else
				{
					credentialsFile = pathToCredentialsFile;
				}


				var credential = GoogleCredential.FromFile(credentialsFile);
                FirebaseApp.Create(new AppOptions
                {
                    Credential = credential,
                });
            }

            _firebaseClient = new FirebaseClient(firebaseUrl);
        }

        public FirebaseClient GetClient()
        {
            return _firebaseClient;
        }
    }
}
