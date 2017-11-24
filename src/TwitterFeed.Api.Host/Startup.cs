using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using TwitterFeed.Api.Http.ExternalIntegration;
using TwitterFeed.Api.Http.Store;

namespace Twitter.Feed.Host
{
    public class Startup
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Startup"/> class.
        /// </summary>
        /// <param name="env"></param>
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddOptions()
                .AddLogging()
                .AddCors()
                .AddMvc()

                // Configure JSON settings

                .AddJsonOptions(options =>
                {
                    // Enable automatic type detection
                    options.SerializerSettings.TypeNameAssemblyFormatHandling = TypeNameAssemblyFormatHandling.Simple;
                    options.SerializerSettings.TypeNameHandling = TypeNameHandling.Objects;

                    // Ensure camelcase property formatting
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

                    // Format Datetime fields to UTC
                    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
                });

            // Add swagger services
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc(
                    Configuration["Swagger:Version"],
                    new Info
                    {
                        Title = Configuration["Swagger:Title"],
                        Description = Configuration["Swagger:Description"],
                        Version = Configuration["Swagger:Version"],
                    });

                if (PlatformServices.Default.Application.ApplicationBasePath != null)
                {
                    var path = Path.Combine(PlatformServices.Default.Application.ApplicationBasePath, Configuration["Swagger:XmlComments"]);
                    options.IncludeXmlComments(path);
                }
            });

            services.Configure<HttpNewsFeedStoreOptions>(options =>
            {
                options.ScreenName = Configuration["OAuth:ScreenName"];
                int.TryParse(Configuration["OAuth:Count"], out int count);
                options.Count = count;
                options.ConsumerKey = Configuration["OAuth:ConsumerKey"];
                options.ConsumerSecret = Configuration["OAuth:ConsumerSecret"];
                options.AccessToken = Configuration["OAuth:AccessToken"];
                options.AccessTokenSecret = Configuration["OAuth:AccessTokenSecret"];
            });

            services.AddTransient<IHttpNewsFeedStore, HttpNewsFeedStore>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable Swagger UI
            app
                .UseSwagger()
                .UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint(Configuration["Swagger:Endpoint"], Configuration["Swagger:Title"]);
                })

                // enable CORS
                .UseCors(policy =>
                            policy
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin());

            app.UseMvc();
        }
    }
}
