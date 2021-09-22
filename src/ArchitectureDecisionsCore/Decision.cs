using System;
using System.Collections.Generic;
using System.Linq;
using ArchitectureDecisionsCore.Abstractions;

namespace ArchitectureDecisionsCore
{
    public class Decision : ICanBeShownInAList
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string DisplayName { get; set; } = string.Empty;
        public string ProblemStatement { get; set; } = string.Empty;
        public List<Criteria>? SolutionCriteria { get; set; }
        public List<Option>? Options { get; set; }
        
        public List<Stakeholder>? Stakeholders { get; set; }
        public Dictionary<int, Dictionary<int, Comparison>>? Comparison { get; set; }
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.Now;
        public DateTimeOffset UpdatedDate { get; set; } = DateTimeOffset.Now;

        public int? ChosenOption { get; set; }
        
        public Decision Sanitise()
        {
            SolutionCriteria ??= new List<Criteria>();
            Comparison ??= new Dictionary<int, Dictionary<int, Comparison>>();
            Options ??= new List<Option>();
            Stakeholders ??= new List<Stakeholder>();

            var index = 0;
            foreach (var criteria in SolutionCriteria.OrderBy(x => x.Index))
            {
                criteria.Index = index++;
                
                if (!Comparison.ContainsKey(criteria.Id))
                {
                    Comparison[criteria.Id] = new Dictionary<int, Comparison>();
                }

                var comparison = Comparison[criteria.Id];
                foreach (var option in Options)
                {
                    if (!comparison.ContainsKey(option.Id))
                    {
                        comparison[option.Id] = new Comparison();
                    }
                }
            }

            SolutionCriteria = SolutionCriteria.OrderBy(x => x.Index).ToList();

            return this;
        }
    }
}