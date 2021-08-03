using Microsoft.AspNetCore.Mvc;

namespace ArchitectureDecisionsWeb
{
    public static class ControllerEx
    {
        public static void SetInfoBanner(this Controller controller, string info)
        {
            controller.TempData["info"] = info;
        }
    }
}