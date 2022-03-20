
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtentions
    {

// This is going to be important for the fitness app 
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(options =>{
                options.Password.RequireNonAlphanumeric =false;
                options.Password.RequiredLength = 1;
                options.Password.RequireUppercase=false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase= false;

            }).AddRoles<AppRole>()
            .AddRoleManager<RoleManager<AppRole>>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddRoleValidator<RoleValidator<AppRole>>()
            .AddEntityFrameworkStores<DataContext>();
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };

                options.Events = new JwtBearerEvents{
                    OnMessageReceived = Context =>{
                        var accessToken = Context.Request.Query["access_token"];
                        var path = Context.HttpContext.Request.Path;
                        if(!string.IsNullOrEmpty(accessToken)&&path.StartsWithSegments("/hubs"))
                        {
                            Context.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    }
                };
            });

            services.AddAuthorization(options =>{
                options.AddPolicy("RequireAdminRole",policy=>policy.RequireRole("Admin"));
                options.AddPolicy("ModeratePhotoRole",policy=>policy.RequireRole("Admin","Moderator"));
            });

            return services;

        }
    }
}