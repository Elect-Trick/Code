using BookingAppAPI.Controllers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using BookingAppAPI.Models;


namespace BookingAppAPI.Controllers
{
  public class UsersController : BaseApiController
  {
    public SignInManager<ApplicationUser> _signInManager;
    public UserManager<ApplicationUser> _userManager;
    public UsersController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
    {
      _userManager = userManager;
      _signInManager = signInManager;
    }

    [HttpPost("login")]
    public  ActionResult Login([FromBody] LoginModel loginData)
    {

      return Ok("Endpoint hit");
      // var user = await _userManager.Users.FirstOrDefaultAsync(user => user.UserName == loginData.UserName);

      // if (user == null)
      // {
      //   return BadRequest("User is not found");
      // }
      // user.UserName = loginData.UserName.ToLower();
      // var result = await _signInManager.CheckPasswordSignInAsync(user, loginData.Password, false);
      // if (result.Succeeded)
      // {
      //   return Ok("Signed in");
      // }
      // else
      // {
      //   return BadRequest("Invalid Password");
      // }
    }
  }
}
