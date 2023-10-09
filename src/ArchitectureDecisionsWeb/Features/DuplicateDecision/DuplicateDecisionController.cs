using System;
using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb.Features.DuplicateDecision
{
    public class DuplicateDecisionController : Controller
    {
        private readonly IDecisionRepository _decisionRepository;

        public DuplicateDecisionController(IDecisionRepository decisionRepository)
        {
            _decisionRepository = decisionRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Execute(Guid id)
        {
            await _decisionRepository.Duplicate(id);
            return new RedirectToActionResult("Execute", "Home", new { });
        }
    }
}