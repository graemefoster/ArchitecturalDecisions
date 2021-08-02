using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb.Features.NewDecision
{
    public class NewDecisionController: Controller
    {
        private readonly IDecisionRepository _decisionRepository;

        public NewDecisionController(IDecisionRepository decisionRepository)
        {
            _decisionRepository = decisionRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Execute()
        {
            var newDecision = _decisionRepository.New();
            await _decisionRepository.Save(newDecision);
            return new RedirectToActionResult("Execute", "EditDecision", new
            {
                decisionId = newDecision.Id
            });
        }
    }
}