using System.Collections.Generic;
using ArchitectureDecisionsCore;

namespace ArchitectureDecisionsWeb.Features.Home
{
    public class ViewModel
    {
        public IList<ReferenceItem<Decision>> Problems { get; set; } = new List<ReferenceItem<Decision>>();
    }
}