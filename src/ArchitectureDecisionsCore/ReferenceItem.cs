using System;
using ArchitectureDecisionsCore.Abstractions;

namespace ArchitectureDecisionsCore
{
    public class ReferenceItem<T> where T : IHaveIdentity, ICanBeShownInAList
    {
        public Guid Id { get; }
        public string DisplayName { get; }

        private ReferenceItem(Guid id, string displayName)
        {
            Id = id;
            DisplayName = displayName;
        }

        public static ReferenceItem<T> FromEntity(T entity)
        {
            return new(entity.Id, entity.DisplayName);
        }
    }
}