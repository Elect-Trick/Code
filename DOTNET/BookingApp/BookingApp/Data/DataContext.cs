
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace BookingApp.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser ,AppRole,int>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
    }
}