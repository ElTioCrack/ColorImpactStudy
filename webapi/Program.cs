using BLL.Interfaces;
using BLL.Services;
using DAL.DbContext;
using DAL.Interfaces;
using DAL.Repositories;

var builder = WebApplication.CreateBuilder(args);

#region Services

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
	options.AddPolicy("ReactCorsPolicy", app =>
	{
		app
			// .WithOrigins("http://localhost:5173")
			.AllowAnyOrigin()
			.AllowAnyHeader()
			.AllowAnyMethod();
	});
});

#endregion

#region Inyeccion de dependencias

builder.Services.AddScoped<IUserDataService, UserDataService>();
builder.Services.AddScoped<IUserDataRepository, UserDataRepository>();

#endregion

#region Configuration

#region Firebase Configuration

var firebaseConfig = builder.Configuration.GetSection("FirebaseConfig");
builder.Services.AddScoped(provider => new FirebaseDbContext(
	firebaseConfig["PathToCredentialsFile"],
	firebaseConfig["FirebaseUrl"]
));

#endregion

#region SQL Server Configuration

// var connectionString = builder.Configuration.GetConnectionString("SqlServerConnection");

// Configurar el contexto de base de datos con Entity Framework Core.
// builder.Services.AddDbContext<ApplicationDbContext>(options =>
// {
//     options.UseSqlServer(connectionString);
// });

#endregion

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment()) {
	app.UseSwagger();
	app.UseSwaggerUI();
//}

app.UseCors("ReactCorsPolicy"); // Habilitar CORS aquí

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
