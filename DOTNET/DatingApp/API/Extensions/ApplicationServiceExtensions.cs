
using API.Data;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using API.Services;
using API.Helpers;
using API.SignalR;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
           services.AddSingleton<PresenceTracker>();
        //    There are other ways of implement the above service for scalibilty  
            services.AddScoped<IPhotoService, PhotosService>();
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<ILikesRepository, LikesRepository>();

            // Lamda expressions allows to pass parameters as expresions, brings convenience. 
            services.AddDbContext<DataContext>(options =>
            {

                //    We need to specify the type of function or execution we want to perform on the DB 
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;

        }
    }
}