using System;
using System.Security.Cryptography;

namespace ArchitectureDecisionsCore.Abstractions
{
    public interface ICanBeShownInAList: IHaveIdentity
    {
        string DisplayName { get; }
        DateTimeOffset CreatedDate { get; }
        DateTimeOffset UpdatedDate { get; }
    }
}