namespace ArchitectureDecisionsWeb.Features.Error
{
    public class ErrorViewModel
    {
        public string RequestId { get; set; } = null!;

        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}