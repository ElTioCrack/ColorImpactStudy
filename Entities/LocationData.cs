using System;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Entities
{
	/// <summary>
	/// Clase que representa datos de ubicación.
	/// </summary>
	[DataContract]
	[Serializable]
	public class LocationData
	{
		/// <summary>
		/// Dirección IP.
		/// </summary>
		[DataMember]
		[JsonPropertyName("ip")]
		public string Ip { get; set; }

		/// <summary>
		/// Nombre de host.
		/// </summary>
		[DataMember]
		[JsonPropertyName("hostname")]
		public string Hostname { get; set; }

		/// <summary>
		/// Ciudad.
		/// </summary>
		[DataMember]
		[JsonPropertyName("city")]
		public string City { get; set; }

		/// <summary>
		/// Región.
		/// </summary>
		[DataMember]
		[JsonPropertyName("region")]
		public string Region { get; set; }

		/// <summary>
		/// País.
		/// </summary>
		[DataMember]
		[JsonPropertyName("country")]
		public string Country { get; set; }

		/// <summary>
		/// Coordenadas de ubicación.
		/// </summary>
		[DataMember]
		[JsonPropertyName("loc")]
		public string Loc { get; set; }

		/// <summary>
		/// Organización.
		/// </summary>
		[DataMember]
		[JsonPropertyName("org")]
		public string Org { get; set; }

		/// <summary>
		/// Zona horaria.
		/// </summary>
		[DataMember]
		[JsonPropertyName("timezone")]
		public string Timezone { get; set; }

		/// <summary>
		/// Información adicional.
		/// </summary>
		[DataMember]
		[JsonPropertyName("readme")]
		public string Readme { get; set; }
	}
}
