using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using AutoMapper;
using BookingApp.Interfaces;
using BookingApp.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookingApp.Controllers
{
    // [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMailSender _mailSender;
        private readonly IMapper _mapper;
        public UsersController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ITokenService tokenService, IMailSender mailSender, IMapper mapper)
        {
            _mapper = mapper;
            _mailSender = mailSender;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> login([FromBody] LoginModel loginModel)
        {
            loginModel.UserName = loginModel.UserName.ToLower();
            var user = await _userManager.FindByNameAsync(loginModel.UserName);
            if (user == null)
            {
                return BadRequest("User not found");

            }


            var loginResult = await _signInManager.CheckPasswordSignInAsync(user, loginModel.Password, false);
            if (!loginResult.Succeeded)
            {
                return Unauthorized();
            }

            return new UserModel
            {
                UserName = loginModel.UserName,
                Gender = user.Gender,
                LastActive = user.LastActive,
                Country = user.Country,
                Token = await _tokenService.CreateToken(user)

            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegisterModel>> Register([FromBody] RegisterModel registerModel)
        {
            var user = await _userManager.FindByEmailAsync(registerModel.EMail);
            if (user != null)
            {
                // User exists
                return BadRequest("E-mail Already exists, try resetting your password");
            }
            user = _mapper.Map<ApplicationUser>(registerModel);
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (result.Succeeded)
            {
                var _token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var confirmationLink = Url.Action("ValidateEmail", "Users", new { userId = user.Id, token = _token }, Request.Scheme);
                await _mailSender.SendEmailAsync(registerModel.EMail, "E-mail Verification", confirmationLink);
                if(_token == null || confirmationLink == null)
                {
                    return BadRequest("Could not complete the reuquest");
                }
                return new RegisterModel{
                    UserName = user.UserName,
                    EMail = user.Email
                };

            }
            return BadRequest("Failed to register, check the supplied information");


        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> ValidateEmail([FromQuery] string userId, string token)
        {
            if (userId == null || token == null)
            {
                return BadRequest("Token or UserId is not found");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                // return new ViewResult
                // {
                //     ContentType ="Thank you, the email has been verified"
                // };
                return Ok("Your email has been Verified, You can close this page and login");
            }
            return BadRequest(result.Errors);

        }

    }
}

