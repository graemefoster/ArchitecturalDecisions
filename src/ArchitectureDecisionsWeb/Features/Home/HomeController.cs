using System.Linq;
using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ArchitectureDecisionsWeb.Features.Home
{
    public class HomeController : Controller
    {
        private readonly IDecisionRepository _repository;

        public HomeController(IDecisionRepository repository, IOptions<DataProtectionOptions> dataProtectionOptions)
        {
            _repository = repository;
            var test = dataProtectionOptions.Value.ApplicationDiscriminator;
        }
        
        // GET
        public async Task<IActionResult> Execute()
        {
            return View(new ViewModel()
            {
                Problems = (await _repository.GetDecisions()).OrderByDescending(x => x.UpdatedAt).ThenByDescending(x => x.CreatedAt).ToArray()
            });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Postback()
        {
            return Ok();
        }
    }
}