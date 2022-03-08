using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class ApplicationUserRole : IdentityUserRole<int>
    {
        public ApplicationUser User { get; set; }
        public AppRole Role { get; set; }
    }
}
