

using API.Interfaces;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;
using API.DTOs;
using API.Helpers;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
       
        public LikesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }

            [HttpPost("{username}")]
            public async Task<ActionResult> AddLike(string username)
            {
                // Nee to check if user is authenticated so we use 
                var sourceUserId = User.GetUserID();
                var likedUser = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
                var sourceUser = await _unitOfWork.LikesRepository.GetUserWithLikes(sourceUserId);

                if(likedUser ==null)
                {
                    return NotFound();
                }

                if(sourceUser.UserName == username)
                {
                    return BadRequest("You cannot like yourself");
                }

                var userLike = await _unitOfWork.LikesRepository.GetUserLike(sourceUserId,likedUser.Id);
                if(userLike != null){
                    return BadRequest("You already like this user");
                }
                userLike = new UserLike{
                    SourceUserId = sourceUserId,
                    LikedUserId = likedUser.Id

                };
                sourceUser.LikedUsers.Add(userLike);

                if( await _unitOfWork.Complete())
                return Ok();
                

                return BadRequest("Failed to like user");
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<LikeDTO>>>GetUserLiked([FromQuery]LikesParams likesParams)
            {
                likesParams.UserId = User.GetUserID();
                var users=  await _unitOfWork.LikesRepository.GetUserLikes(likesParams);
                Response.AddPaginationHeader(users.CurrentPage, users.PageSize,users.TotalCount,users.TotalPages);
                return Ok(users);
            }

    }

}