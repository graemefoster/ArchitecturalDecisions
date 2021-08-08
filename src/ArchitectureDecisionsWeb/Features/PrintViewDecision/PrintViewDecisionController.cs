using System;
using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb.Features.PrintViewDecision
{
    public class PrintViewDecisionController : Controller
    {
        private readonly IDecisionRepository _repository;

        public PrintViewDecisionController(IDecisionRepository repository)
        {
            _repository = repository;
        }
        
        // GET
        public async Task<IActionResult> Execute(Guid id)
        {
            return View(new ViewModel()
            {
                Decision = (await _repository.Get(id))
            });
        }
    }
}