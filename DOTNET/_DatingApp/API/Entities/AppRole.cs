
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppRole: IdentityRole<int>
    {
        // We need to get a list of roles the user is in, many to many.
        // Each user can have multiple roles 

        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}