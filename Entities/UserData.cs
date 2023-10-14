using System.Runtime.Serialization;

namespace Entities
{
	//[DataContract]
	//[Serializable]
	public class UserData
    {
        /// <summary>
        /// Un identificador único para cada registro
        /// </summary>
        public object Id { get; set; }

        /// <summary>
        /// La frase proporcionada por el usuario
        /// </summary>
        public string Phrase { get; set; }

        /// <summary>
        /// El color de fondo generado
        /// </summary>
        public string BackgroundColor { get; set; }

        /// <summary>
        /// El color de texto generado
        /// </summary>
        public string TextColor { get; set; }

        /// <summary>
        /// La hora de acceso
        /// </summary>
        public DateTime AccessTime { get; set; }

        /// <summary>
        /// El tiempo transcurrido, en segundos, desde que se ingresó a la página y se envió la interacción (por ejemplo, al hacer clic en un botón).
        /// </summary>
        public int ReactionTime { get; set; }

		/// <summary>
		/// Indica si al usuario le gusta o no (true = le gusta, false = no le gusta).
		/// </summary>
		public bool Reaction { get; set; }

		/// <summary>
		/// La ciudad del usuario.
		/// </summary>
		public string City { get; set; }

        /// <summary>
        /// El país del usuario.
        /// </summary>
        public string Country { get; set; }

        /// <summary>
        /// La dirección IP del usuario.
        /// </summary>
        public string UserIpAddress { get; set; }
    }
}
