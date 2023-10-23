using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb.Features.SaveDecision
{
    public class SaveDecisionController : Controller
    {
        private readonly IDecisionRepository _decisionRepository;

        public SaveDecisionController(IDecisionRepository decisionRepository)
        {
            _decisionRepository = decisionRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Execute(Decision decision)
        {
            await _decisionRepository.Save(decision);
            return new RedirectToActionResult("Execute", "Home", new { });
        }
    }
}