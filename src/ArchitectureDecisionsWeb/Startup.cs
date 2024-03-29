using System.IO;
using ArchitectureDecisionsCore;
using JetBrains.Annotations;
using Markdig;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

[assembly: AspMvcViewLocationFormat(@"~\Features\{1}\{0}.cshtml")]
[assembly: AspMvcViewLocationFormat(@"~\Features\{0}.cshtml")]
[assembly: AspMvcViewLocationFormat(@"~\Features\Shared\{0}.cshtml")]

[assembly: AspMvcAreaViewLocationFormat(@"~\Areas\{2}\{1}\{0}.cshtml")]
[assembly: AspMvcAreaViewLocationFormat(@"~\Areas\{2}\Features\{1}\{0}.cshtml")]
[assembly: AspMvcAreaViewLocationFormat(@"~\Areas\{2}\{0}.cshtml")]
[assembly: AspMvcAreaViewLocationFormat(@"~\Areas\{2}\Shared\{0}.cshtml")]


namespace ArchitectureDecisionsWeb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddRazorPages().AddRazorRuntimeCompilation();
            services.Configure<RazorViewEngineOptions>(x =>
            {
                x.ViewLocationExpanders.Add(new FeatureLocationExpander());
            });

            services.Configure<Settings>(Configuration.GetSection("ArchitectureDecisionSettings"));

            services.AddSingleton<IDecisionRepository, IDecisionRepository>(sp =>
                new DecisionRepository(sp.GetRequiredService<IOptions<Settings>>().Value.StoragePath));

            services.AddSingleton(new MarkdownPipelineBuilder().UseAdvancedExtensions().Build());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseStaticFiles(new StaticFileOptions()
            {
                ServeUnknownFileTypes = true,
            });
            app.UseStaticFiles(new StaticFileOptions()
            {
                ServeUnknownFileTypes = true,
                RequestPath = "/optionimages",
                FileProvider = new PhysicalFileProvider(Path.Combine(app.ApplicationServices.GetRequiredService<IOptions<Settings>>().Value.StoragePath, "images"))
            });

            app.UseRouting();

            // app.UseAuthentication();
            // app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Execute}/{id?}");
                endpoints.MapRazorPages();
            });
        }
    }

    public class Settings
    {
        public string StoragePath { get; set; } = null!;
    }
}