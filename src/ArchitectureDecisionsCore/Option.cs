using System.Collections.Generic;

namespace ArchitectureDecisionsCore
{
    public class Option
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public byte[] DrawIoDiagram { get; set; } = System.Array.Empty<byte>();
        public List<ServiceCost> EstimatedServiceCosts { get; set; } = new List<ServiceCost>();
    }
}