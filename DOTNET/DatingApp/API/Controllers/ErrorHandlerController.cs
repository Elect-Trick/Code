using API.Data;
using Microsoft.AspNetCore.Mvc;
using API.Entities;

namespace API.Controllers
{
    public class ErrorHandlerController : BaseApiController
    {
        private readonly DataContext context;

        public ErrorHandlerController(DataContext Context)
        {
            context = Context;
        }

        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return Unauthorized("Not Authorized");
        }

        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var something = context.Users.Find(-1);
            if (something == null)
            {
                return NotFound();
            }
            return Ok(something);
        }


        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var something = context.Users.Find(-1);
            var thingToReturn = something.ToString();
            return thingToReturn;
        }


        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }

    }
}