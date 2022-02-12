using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOs;
using API.Helpers;
using AutoMapper;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly ITokenService _token;
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository userRepo, ITokenService token, IMapper mapper)
        {
            
            _mapper = mapper;
            _userRepo = userRepo;
            _token = token;
        }



        [HttpGet]
        // Making your code Asynchronous helps to serve multiple requests with ease
        // Each thread is passed on to the next available thread 
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers()
        {

            //    There are async functions, choose these over regular ones
            var users = await _userRepo.GetMembersAsync();

            var usersToReturn = _mapper.Map<IEnumerable<MemberDTO>>(users);
            return Ok(usersToReturn);
        }

        // api/users/id
        [HttpGet("{username}")]
        public async Task<MemberDTO> GetUserByUsernameAsync(string username)
        {
            return await _userRepo.GetMemberAsync(username);
        }

        [HttpPut]
       public async Task<ActionResult> UpdateProfile(MemberUpdateDTO newDetails)
        {
            // This will find the username from the token the API uses to authenticate this user
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userRepo.GetUserByUsernameAsync(username);
            _mapper.Map(newDetails,user);


            _userRepo.Update(user);

            if(await _userRepo.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");


        }
    }
}