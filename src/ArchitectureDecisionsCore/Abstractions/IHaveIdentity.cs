using System;

namespace ArchitectureDecisionsCore.Abstractions
{
    public interface IHaveIdentity
    {
        Guid Id { get; }
    }
}