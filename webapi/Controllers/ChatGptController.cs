using FirebaseAdmin.Messaging;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Completions;
using System.Diagnostics;
using System.Runtime.InteropServices.ObjectiveC;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace TuProyecto.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ChatGPTController : ControllerBase
	{
		private readonly string apiKey = "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"; // Reemplaza esto con tu API key de OpenAI
		private readonly string defaultPrompt = "Quiero que hagas...";

		//[HttpGet]
		//public async Task<IActionResult> Get()
		//{
		//	string response = await GenerateTextAsync(defaultPrompt);
		//	return Ok(new { response });
		//}

		//[HttpGet("{prompt}")]
		[HttpGet]
		public async Task<IActionResult> Get(string prompt)
		{
			var answer = string.Empty;
			var api = new OpenAI_API.OpenAIAPI(apiKey);
			CompletionRequest completion = new CompletionRequest();
			completion.Prompt = prompt;
			completion.MaxTokens = 4000;
			var result = await api.Completions.CreateCompletionAsync(completion);
			if (result != null)
			{
				foreach (var item in result.Completions)
				{
					answer = item.Text;
				}
			}
			return Ok(new { result });
		}
	}
}
