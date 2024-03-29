﻿namespace ArchitectureDecisionsCore
{
    public class Criteria
    {
        public int Id { get; set; }
        public int? Index { get; set; }
        public string? Description { get; set; }

        public string? Definition { get; set; }
        public bool IsPrimary { get; set; }
    }
}