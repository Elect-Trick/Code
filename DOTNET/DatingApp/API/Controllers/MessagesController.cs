using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IUserRepository UserRepository;
        private readonly IMessageRepository MessageRepository;
        private readonly IMapper _mapper;
        public MessagesController(IUserRepository userRepository, IMessageRepository messageRepository, IMapper mapper)
        {
            _mapper = mapper;
            MessageRepository = messageRepository;
            UserRepository = userRepository;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDTO>> CreateMessage([FromBody] CreateMessageDTO createMessageDTO)
        {
            var username = User.GetUsername();

            if (username == createMessageDTO.RecipientUsername)
            {
                return BadRequest("You cannot send messages to yourself.");

            }

            var sender = await UserRepository.GetUserByUsernameAsync(username);
            var recipient = await UserRepository.GetUserByUsernameAsync(createMessageDTO.RecipientUsername);

            if (recipient == null)
            {
                return NotFound();
            }

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = createMessageDTO.RecipientUsername,
                Content = createMessageDTO.Content

            };
            MessageRepository.AddMessage(message);

            if (await MessageRepository.SaveAllAsync())
            {
                return Ok(_mapper.Map<MessageDTO>(message));
            }

            return BadRequest("Message could not be sent");

        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();
            var messages = await MessageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return messages;
        }
        [HttpGet("thread/{username}")]
        // Username in this instance is the recipient
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUsername();
            return Ok(await MessageRepository.GetMessagesThread(currentUsername, username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id){

            var username = User.GetUsername();
            var message = await MessageRepository.GetMessage(id);

            if(message.Sender.UserName != username && message.Recipient.UserName !=username){
                return Unauthorized();
            }

            if(message.Sender.UserName == username)
            {
                message.SenderDeleted = true;

            }
            if(message.Recipient.UserName == username){
                message.RecipientDeleted = true;
            }

            if(message.SenderDeleted && message.RecipientDeleted)
            {
                MessageRepository.DeleteMessage(message);
            }
            if(await MessageRepository.SaveAllAsync()){
                return Ok();
            }
            return BadRequest("Could not delete message");
        }
    }
}