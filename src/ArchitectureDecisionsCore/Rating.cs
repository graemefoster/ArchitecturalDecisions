namespace ArchitectureDecisionsCore
{
    public class Rating
    {
        public Option Option { get; set; } = new Option();
        public string Commentary { get; set; } = string.Empty;
        public Rank Rank { get; set; } = Rank.Average;
    }
}