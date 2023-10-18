using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PhraseController : ControllerBase
	{
		private List<(bool IsPositive, string Phrase)> phraseList = new List<(bool, string)>
		{
			// Frases Positivas de Videojuegos
			(true, "No necesitas una razón para ayudar a alguien"),
			(true, "Lucharé, fracazaré, pero rendirme es un privilegio que no tengo."),
			(true, "Solo en la debilidad descubro mi verdadera fuerza."),
			(true, "No te disculpes, solo mejora."),
			(true, "Que es la valentia sin un poco de imprudencia?"),
			(true, "No importa cuanto tiempo tengas sino como lo usas"),
			(true, "No se trata de cuantas veces te derriban si no de cuantas veces te levantas"),

			// Frases Negativas de Videojuegos
			(false, "La intención no importa solo las consecuencias."),
			(false, "La culminación del amor es él dolor y aun así amamos a pesar de lo inevitable."),
			(false, "La vida es extraña."),
			(false, "No hay sacrificio demasiado grande"),
			(false, "Nada es verdad. Todo está permitido."),
			(false, "Los hombres eligen, los esclavos obedecen."),
			(false, "A menudo, los peores monstruos son los que llevamos dentro."),
		};

		// GET api/phrase
		[HttpGet]
		public IActionResult Get()
		{
			// Selecciona aleatoriamente un par de la lista
			Random random = new Random();
			int randomIndex = random.Next(phraseList.Count);
			var selectedPhrase = phraseList[randomIndex];

			var phraseData = new
			{
				Phrase = selectedPhrase.Phrase,
				IsPhrasePositive = selectedPhrase.IsPositive
			};

			return Ok(phraseData);
		}
	}
}
