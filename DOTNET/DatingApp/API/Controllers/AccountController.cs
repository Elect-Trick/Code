using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Entities;
using System.Text;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using AutoMapper;

namespace API.Controllers

{
    public class AccountController : BaseApiController
    {
        private readonly DataContext Context;
        private readonly ITokenService TokenService;
        private readonly IMapper _mapper;
        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            TokenService = tokenService;
            Context = context;
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
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            user.UserName = registrationData.Username.ToLower();
            // We use this to generate a Hash key and then obtain the password Salt from the hmac.key
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationData.Password));
            user.PasswordSalt = hmac.Key;

            // Adding data to the table.

            Context.Users.Add(user);
            // Actively saving and tracking changes to the DB 
            await Context.SaveChangesAsync();
            return new UserDTO
            {
                Username = user.UserName,
                Token = TokenService.CreateToken(user),
                KnownAs = user.KnownAs

            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginData)
        {
            // Find the entry in the table based off a username 
            var user = await Context.Users.Include(z => z.Photos).SingleOrDefaultAsync(x => x.UserName == loginData.Username.ToLower());
            if (user == null)
            {
                return BadRequest("Invalid Username");
            }
            // This gives us the Password Hash generated on registration , uses the stored salt
            using var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt);
            // Generates a has from thee entered password on the F.E
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginData.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                // Comapring each character in the hash
                if (computedHash[i] != user.PasswordHash[i])
                {
                    return BadRequest("Invalid Password");
                }

            }

            return new UserDTO
            {
                Username = user.UserName,
                Token = TokenService.CreateToken(user),
                PhotoUrl = user.Photos?.FirstOrDefault(x => x.isMain)?.Url,
                KnownAs = user.KnownAs


            };

        }

        private async Task<bool> UserExists(string username)
        {
            return await Context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

    }
}