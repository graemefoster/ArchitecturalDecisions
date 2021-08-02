using System;
using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb.Features.EditDecision
{
    public class EditDecisionController : Controller
    {
        private readonly IDecisionRepository _repository;

        public EditDecisionController(IDecisionRepository repository)
        {
            _repository = repository;
        }
        
        // GET
        public async Task<IActionResult> Execute(Guid id)
        {
            var decision = await _repository.Get(id);
            
            return View(new EditDecisionViewModel()
            {
                Decision = decision
            });
        }
    }
}