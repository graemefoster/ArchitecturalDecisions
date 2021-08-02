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
        public List<Criteria> SolutionCriteria { get; set; } = new List<Criteria>();
        public List<Option> Options { get; set; } = new List<Option>();
        public Dictionary<Criteria, Comparison> Comparison { get; set; } = new Dictionary<Criteria, Comparison>();
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.Now;
        public DateTimeOffset ModifiedAt { get; set; } = DateTimeOffset.Now;
    }
}