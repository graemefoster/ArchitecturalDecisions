using System.Linq;
using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb.Features.Home
{
    public class HomeController : Controller
    {
        private readonly IDecisionRepository _repository;

        public HomeController(IDecisionRepository repository)
        {
            _repository = repository;
        }
        
        // GET
        public async Task<IActionResult> Execute()
        {
            return View(new ViewModel()
            {
                Problems = (await _repository.GetDecisions()).OrderByDescending(x => x.UpdatedAt).ThenByDescending(x => x.CreatedAt).ToArray()
            });
        }
    }
}