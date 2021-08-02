using System.Diagnostics;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ArchitectureDecisionsWeb.Features.Error
{
    public class ErrorController : Controller
    {
        private readonly ILogger<ErrorController> _logger;
        private readonly IDecisionRepository _decisionRepository;

        public ErrorController(
            ILogger<ErrorController> logger,
            IDecisionRepository decisionRepository)
        {
            _logger = logger;
            _decisionRepository = decisionRepository;
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel {RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier});
        }
    }
}