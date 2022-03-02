using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using API.DTOs;
using AutoMapper;
using API.Extensions;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Helpers;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly ITokenService _token;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly DbContext _context;
        private readonly IUnitOfWork _unitOfWork;

        public UsersController(IUnitOfWork unitOfWork, ITokenService token, IMapper mapper, IPhotoService photoService, DataContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
            _photoService = photoService;

            _mapper = mapper;
            _token = token;
        }


        [HttpGet]
        // Making your code Asynchronous helps to serve multiple requests with ease
        // Each thread is passed on to the next available thread 
        public async Task<ActionResult<IEnumerable<MemberDTO>>> GetUsers([FromQuery] UserParams userParams)
        {

            //    There are async functions, choose these over regular ones
            // Users is now a pagedList
            var gender = await _unitOfWork.UserRepository.GetMemberGender(User.GetUsername());
            userParams.CurrentUsername = User.GetUsername();

            if (!string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = gender == "male" ? "male" : "female";
            }
            var users = await _unitOfWork.UserRepository.GetMembersAsync(userParams);
            Response.AddPaginationHeader(users.CurrentPage, userParams.PageSize, users.TotalCount, users.TotalPages);

            // var usersToReturn = _mapper.Map<IEnumerable<MemberDTO>>(users);
            return Ok(users);
        }

        // api/users/id
        [HttpGet("{username}", Name = "GetUser")]
        public async Task<MemberDTO> GetUserByUsernameAsync(string username)
        {
            return await _unitOfWork.UserRepository.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProfile(MemberUpdateDTO newDetails)
        {
            // This will find the username from the token the API uses to authenticate this user
            // var username = User.GetUsername();
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            _mapper.Map(newDetails, user);


            _unitOfWork.UserRepository.Update(user);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update user");


        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDTO>> AddPhoto(IFormFile file)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var result = await _photoService.AddPhotosAsync(file);
            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            }

            var photo = new Photo
            {

                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId

            };

            if (user.Photos.Count == 0)
            {
                photo.isMain = false;
            }

            user.Photos.Add(photo);
            if (await _unitOfWork.Complete())
            {
                // This allows for us to return a 201(Created code), 
                // this is ideal for content upload
                return CreatedAtRoute("GetUser", new { Username = user.UserName }, _mapper.Map<Photo, PhotoDTO>(photo));
            }
            return BadRequest("Problem adding photos");

        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> setMainPhoto(int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.isMain)
            {
                return BadRequest("This photo is already the main one");


            }
            var currentMain = user.Photos.FirstOrDefault(x => x.isMain);
            if (currentMain != null)
            {
                currentMain.isMain = false;
            }
            photo.isMain = true;

            if (await _unitOfWork.Complete())
            {
                return NoContent();
            }
            return BadRequest("Failed to set main photo");

        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult<Boolean>> DeletePhoto(int photoId)
        {
            var user = await _unitOfWork.UserRepository.GetUserByUsernameAsync(User.GetUsername());
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo == null)
            {
                return false;
            }
            else if (photo.isMain == true)
            {
                return false;
            }
            else
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error == null)
                {
                    var deleted = await _unitOfWork.UserRepository.DeletePhoto(photoId, User.GetUsername());

                    if (deleted)
                    {
                        return true;
                    }
                    return false;
                }
                else
                {
                    return false;
                }



            }


            // return BadRequest("Could not delete photo")
        }
    }
}