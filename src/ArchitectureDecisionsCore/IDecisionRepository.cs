using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArchitectureDecisionsCore
{
    public interface IDecisionRepository
    {
        public Task<IList<ReferenceItem<Decision>>> GetDecisions();
        Decision New();
        Task<Decision> Save(Decision decision);
        Task<Decision> Get(Guid decisionId);
        Task Delete(Guid decisionId);
    }
}