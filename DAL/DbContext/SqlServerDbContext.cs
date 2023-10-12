/*
using Microsoft.EntityFrameworkCore;
using Google.Api;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace DAL.DbContext
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{
		}

		// Define las DbSet para tus entidades aquí.
		public DbSet<Person> UserData { get; set; }

		// Puedes agregar configuraciones adicionales para tus entidades en el método OnModelCreating si lo necesitas.
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// Configuraciones adicionales de entidades aquí
		}
	}
}
*/