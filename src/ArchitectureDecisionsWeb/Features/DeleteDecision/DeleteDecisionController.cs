using System;
using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb.Features.DeleteDecision
{
    public class DeleteDecisionController : Controller
    {
        private readonly IDecisionRepository _decisionRepository;

        public DeleteDecisionController(IDecisionRepository decisionRepository)
        {
            _decisionRepository = decisionRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Execute(Guid id)
        {
            var decision = await _decisionRepository.Get(id);
            await _decisionRepository.Delete(id);
            this.SetInfoBanner($"Deleted problem \"{decision.DisplayName}\"");
            return new RedirectToActionResult("Execute", "Home", new { });
        }
    }
}