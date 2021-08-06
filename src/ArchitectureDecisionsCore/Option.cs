using System.Collections.Generic;

namespace ArchitectureDecisionsCore
{
    public class Option
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public string? Diagram { get; set; }
        public List<ServiceCost> EstimatedServiceCosts { get; set; } = new List<ServiceCost>();
    }
}