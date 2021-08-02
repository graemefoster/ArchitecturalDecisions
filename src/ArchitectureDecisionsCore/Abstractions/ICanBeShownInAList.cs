namespace ArchitectureDecisionsCore.Abstractions
{
    public interface ICanBeShownInAList: IHaveIdentity
    {
        string DisplayName { get; set; }
    }
}