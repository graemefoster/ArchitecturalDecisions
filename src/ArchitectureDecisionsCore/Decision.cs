using System;
using System.Collections.Generic;
using ArchitectureDecisionsCore.Abstractions;

namespace ArchitectureDecisionsCore
{
    public class Decision : ICanBeShownInAList
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string DisplayName { get; set; } = string.Empty;
        public string ProblemStatement { get; set; } = string.Empty;
        public string BusinessRequirements { get; set; } = string.Empty;
        public List<Criteria> SolutionCriteria { get; set; }
        public List<Option> Options { get; set; }
        public Dictionary<int, Dictionary<int, Comparison>> Comparison { get; set; } = new Dictionary<int, Dictionary<int, Comparison>>();
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.Now;
        public DateTimeOffset UpdatedDate { get; set; } = DateTimeOffset.Now;

        public void Sanitise()
        {
            foreach (var criteria in SolutionCriteria)
            {
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
        }
    }
}