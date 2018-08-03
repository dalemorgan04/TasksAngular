using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tasks.Service.Thoughts;
using TasksAngular.Models;
using TasksAngular.Models.Entities;
using TasksAngular.Models.Seed;
using TasksAngular.Service.Thoughts;

namespace TasksAngular
{
    public class Startup
    {
        private IConfiguration configuration { get; }
        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TasksContext>(cfg =>
            {
                cfg.UseSqlServer(configuration.GetConnectionString("TasksConnectionString"));
            });
            services.AddTransient<TasksSeeder>();
            services.AddScoped<IThoughtService, ThoughtService>();
            services.AddMvc();
            RegisterMappings();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
                //Doesn't work with Angular 6
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

            //Seed
            if (env.IsDevelopment())
            {
                using (var scope = app.ApplicationServices.CreateScope())
                {
                    var seeder = scope.ServiceProvider.GetService<TasksSeeder>();
                    seeder.Seed();
                }
            }
        }

        private void RegisterMappings()
        {
            Mapper.Initialize(cfg =>
            {
                //Domain Model

                //Dtos
                cfg.AddProfile(new ThoughtDtoMap());
            });
        }
    }
}
