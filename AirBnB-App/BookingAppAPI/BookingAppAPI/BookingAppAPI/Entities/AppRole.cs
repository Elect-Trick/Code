
using System.Collections.Generic;
using BookingAppAPI.Models;
using Microsoft.AspNetCore.Identity;


public class AppRole : IdentityRole<int>
{
  // We need to get a list of roles the user is in, many to many.
  // Each user can have multiple roles

  public ICollection<ApplicationUser> UserRoles { get; set; }
}
