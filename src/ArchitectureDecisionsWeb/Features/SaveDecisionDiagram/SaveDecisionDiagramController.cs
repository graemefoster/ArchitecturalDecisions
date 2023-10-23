using System;
using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb.Features.SaveDecisionDiagram
{
    [Route("/[controller]/[action]")]
    public class SaveDecisionDiagramController : Controller
    {
        private readonly IDecisionRepository _decisionRepository;

        public SaveDecisionDiagramController(IDecisionRepository decisionRepository)
        {
            _decisionRepository = decisionRepository;
        }

        [HttpPost("{id}/{optionId}")]
        public async Task<IActionResult> Execute(Guid id, int optionId, [FromForm]IFormFile imageFile)
        {
            await using var stream = imageFile.OpenReadStream();
            await _decisionRepository.SetDecisionImage(imageFile.FileName, stream, id, optionId);
            return new RedirectToActionResult("Execute", "EditDecision", new { id = id });
        }
    }
}