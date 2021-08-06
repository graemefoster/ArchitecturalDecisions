using System;
using System.Threading.Tasks;
using ArchitectureDecisionsCore;
using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb.Features.SaveDecision
{
    [ApiController]
    [Route("/api/[controller]")]
    public class SaveDecisionApiController : ControllerBase
    {
        private readonly IDecisionRepository _decisionRepository;

        public SaveDecisionApiController(IDecisionRepository decisionRepository)
        {
            _decisionRepository = decisionRepository;
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> Execute(Guid id, Decision decision)
        {
            if (id != decision.Id) return BadRequest("Invalid decision?");
            return Ok(await _decisionRepository.Save(decision));
        }
    }
}