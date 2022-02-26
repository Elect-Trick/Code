using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AdminController : BaseApiController
    {
        public UserManager<AppUser> UserManager { get; }
        public AdminController(UserManager<AppUser> userManager)
        {
            UserManager = userManager;

        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithoutRoles()
        {

            var users = await UserManager.Users.
            Include(ur => ur.UserRoles)
            .ThenInclude(r => r.Role)
            .OrderBy(u => u.UserName)
            .Select(u => new
            {
                u.Id,
                Username = u.UserName,
                Roles = u.UserRoles
             .Select(r => r.Role.Name).ToList()
            }
            ).ToListAsync();

            return Ok(users);

        }


        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-to-moderate")]
        public ActionResult GetPhotosForModeration()
        {
            return Ok("Admins or moderators can see this");
        }

        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, [FromQuery] string roles)
        {
            var selectedRoles = roles.Split(",").ToArray();
            var user = await UserManager.FindByNameAsync(username);
            if (user == null) return NotFound("User not found");
            var UserRoles = await UserManager.GetRolesAsync(user);
            var result = await UserManager.AddToRolesAsync(user, selectedRoles.Except(UserRoles));
            if (!result.Succeeded)
            {
                return BadRequest("Failed to add to roles");
            }

            result = await UserManager.RemoveFromRolesAsync(user, UserRoles.Except(selectedRoles));
            if (!result.Succeeded)
            {
                return BadRequest("Failed to remove from roles");
            }

            return Ok(await UserManager.GetRolesAsync(user));
        }
    }
}