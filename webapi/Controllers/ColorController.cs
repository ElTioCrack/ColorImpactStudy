using Entities;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers
{
	[ApiController]
	[Route("api/colors")]
	public class ColorController : ControllerBase
	{
        // Método de ejemplo para generar colores aleatorios.
        private ColorModel GenerateColorUsingNeuralNetwork()
        {
            // Implementa la lógica de generación de colores aquí
            // utilizando tu red neuronal.
            // Esto es solo un ejemplo simplificado.
            Random random = new Random();
            return new ColorModel
            {
                Red = random.Next(256),
                Green = random.Next(256),
                Blue = random.Next(256)
            };
        }

        [HttpGet]
		[Route("generate")]
		public IActionResult GenerateRandomColor()
		{
			// Aquí implementarás la lógica para generar colores aleatorios
			// utilizando tu red neuronal y devolverlos como respuesta.
			// Puedes rellenar esta acción con la lógica específica de generación.
			var randomColor = GenerateColorUsingNeuralNetwork();

			return Ok(randomColor);
		}

        [HttpGet]
        [Route("getrandomrainbowcolors")]
        public IActionResult GetRandomRainbowColors()
        {
            List<string> coloresArcoiris = new List<string>
            {
                "red", "orange", "yellow", "green", "blue", "indigo", "violet"
            };

            // Generar números aleatorios para seleccionar dos colores distintos
            Random random = new Random();
            int indiceFondo = random.Next(0, coloresArcoiris.Count);
            int indiceTexto;

            //do {
                indiceTexto = random.Next(0, coloresArcoiris.Count);
            //} while (indiceTexto == indiceFondo);

            // Seleccionar colores aleatorios
            string colorFondo = coloresArcoiris[indiceFondo];
            string colorTexto = coloresArcoiris[indiceTexto];

            // Crear un objeto JSON que contiene los colores seleccionados
            var colorsResponse = new
            {
                BackgroundColor = colorFondo,
                TextColor = colorTexto
            };

            // Devolver el objeto JSON como respuesta
            return Ok(colorsResponse);
        }

    }
}
