using System;
using ArchitectureDecisionsCore.Abstractions;

namespace ArchitectureDecisionsCore
{
    public class ReferenceItem<T> where T : IHaveIdentity, ICanBeShownInAList
    {
        public Guid Id { get; }
        public string DisplayName { get; }
        public DateTimeOffset CreatedAt { get; }
        public DateTimeOffset UpdatedAt { get; }

        private ReferenceItem(Guid id, string displayName, DateTimeOffset createdAt, DateTimeOffset updatedAt)
        {
            Id = id;
            DisplayName = displayName;
            CreatedAt = createdAt;
            UpdatedAt = updatedAt;
        }

        public static ReferenceItem<T> FromEntity(T entity)
        {
            return new(entity.Id, entity.DisplayName, entity.CreatedDate, entity.UpdatedDate);
        }
    }
}