using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{

    public class UsersController : BaseApiController
    {
        private readonly DataContext Context;
        public UsersController(DataContext context)
        {
            Context = context;
        }
        [AllowAnonymous]
        [HttpGet]
        // Making your code Asynchronous helps to serve multiple requests with ease
        // Each thread is passed on to the next available thread 
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
        //    There are async functions, choose these over regular ones
            return await Context.Users.ToListAsync();

        }

        // api/users/id
        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<AppUser> GetUser(int id)
        {
            return Context.Users.Find(id);
        }
    }
}