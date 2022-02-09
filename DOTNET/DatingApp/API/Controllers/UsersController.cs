using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;

namespace API.Controllers
{   [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly ITokenService _token;

        private readonly DataContext Context;
        public UsersController(DataContext context, ITokenService token)
        {
            _token = token;
            Context = context;
        }

     

        [HttpGet]
        // Making your code Asynchronous helps to serve multiple requests with ease
        // Each thread is passed on to the next available thread 
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            
            //    There are async functions, choose these over regular ones
            return await Context.Users.ToListAsync();

        }

        // api/users/id
        [HttpGet("{id}")]
        public ActionResult<AppUser> GetUser(int id)
        {
            return Context.Users.Find(id);
        }
    }
}