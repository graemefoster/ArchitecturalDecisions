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

            foreach (var criteria in Options)
            {
                criteria.Description ??= "";
            }

            var index = 0;
            foreach (var criteria in SolutionCriteria.OrderBy(x => x.Index))
            {
                criteria.Index = index++;
                criteria.Description ??= "";
                criteria.Definition ??= "";
                
                if (!Comparison.ContainsKey(criteria.Id))
                {
                    Comparison[criteria.Id] = new Dictionary<int, Comparison>();
                }

                var comparison = Comparison[criteria.Id];
                foreach (var option in Options)
                {
                    comparison.TryAdd(option.Id, new Comparison());
                }
            }

            var allOptionIds = Options.Select(x => x.Id).ToArray();
            foreach (var comparison in Comparison)
            {
                var comparisonsWithoutAnOption = comparison.Value.Keys.Except(allOptionIds);
                foreach (var missingOption in comparisonsWithoutAnOption)
                {
                    comparison.Value.Remove(missingOption);
                }
            }

            SolutionCriteria = SolutionCriteria.OrderBy(x => x.Index).ToList();

            return this;
        }
    }
}