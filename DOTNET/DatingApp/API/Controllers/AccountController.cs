using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers

{
    public class AccountController : BaseApiController
    {
        private readonly DataContext Context;
        private readonly ITokenService TokenService;
        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        public AccountController(ITokenService tokenService, IMapper mapper, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            TokenService = tokenService;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDTO registrationData)
        {

            if (await UserExists(registrationData.Username))
            {
                return BadRequest("Username already exists");
            }
            var user = _mapper.Map<AppUser>(registrationData);

            // The using statement implements the dispose method
            // This will destroy the newly created instance once we are done
            // using var hmac = new System.Security.Cryptography.HMACSHA512();
            user.UserName = registrationData.Username.ToLower();
            // We use this to generate a Hash key and then obtain the password Salt from the hmac.key
            // For Indentity we do not need these as they are managed for us
            // user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationData.Password));
            // user.PasswordSalt = hmac.Key;

            // Adding data to the table.

            var result = await _userManager.CreateAsync(user, registrationData.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // var role = await _userManager.AddToRoleAsync(user,"Member");



            // Actively saving and tracking changes to the DB 
            //   Removed due to Usermanager handling it
            // await Context.SaveChangesAsync();

            return new UserDTO
            {
                Username = user.UserName,
                Token = await TokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender



            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginData)
        {
            // Find the entry in the table based off a username 
            var user = await _userManager.Users.Include(z => z.Photos).SingleOrDefaultAsync(x => x.UserName == loginData.Username.ToLower());
            if (user == null)
            {
                return BadRequest("Invalid Username");
            }

            // This gives us the Password Hash generated on registration , uses the stored salt
            // using var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt);
            // Generates a has from thee entered password on the F.E
            // var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginData.Password));

            // for (int i = 0; i < computedHash.Length; i++)
            // {
            //     // Comapring each character in the hash
            //     if (computedHash[i] != user.PasswordHash[i])
            //     {
            //         return BadRequest("Invalid Password");
            //     }

            // }

            // Flag indicating if the user account should be locked if the sign in fails.
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginData.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized();
            }
            // var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            // if(!roleResult.Succeeded)return BadRequest(roleResult.Errors);

            return new UserDTO
            {
                Username = user.UserName,
                Token = await TokenService.CreateToken(user),
                PhotoUrl = user.Photos?.FirstOrDefault(x => x.isMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender


            };

        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

    }
}