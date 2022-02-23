
using API.Helpers;
using API.Data;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController :ControllerBase
    {
        
    }
}