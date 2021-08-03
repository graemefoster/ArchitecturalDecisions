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
        public List<Option> Options { get; set; } = new List<Option>();
        public Dictionary<Criteria, Comparison> Comparison { get; set; } = new Dictionary<Criteria, Comparison>();
        public DateTimeOffset CreatedDate { get; set; } = DateTimeOffset.Now;
        public DateTimeOffset UpdatedDate { get; set; } = DateTimeOffset.Now;
    }
}