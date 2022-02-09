using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOs;
using API.Helpers;
using AutoMapper;

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
    }
}