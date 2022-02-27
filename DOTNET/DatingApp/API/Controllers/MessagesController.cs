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
        private readonly IMapper _mapper;
        public IUnitOfWork UnitOfWork { get; }
        public MessagesController(IUnitOfWork unitOfWork,  IMapper mapper)
        {
            UnitOfWork = unitOfWork;
            _mapper = mapper;
           
        }

        [HttpPost]
        public async Task<ActionResult<MessageDTO>> CreateMessage([FromBody] CreateMessageDTO createMessageDTO)
        {
            var username = User.GetUsername();

            if (username == createMessageDTO.RecipientUsername)
            {
                return BadRequest("You cannot send messages to yourself.");

            }

            var sender = await UnitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var recipient = await UnitOfWork.UserRepository.GetUserByUsernameAsync(createMessageDTO.RecipientUsername);

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
            UnitOfWork.MessageRepository.AddMessage(message);

            if (await UnitOfWork.Complete())
            {
                return Ok(_mapper.Map<MessageDTO>(message));
            }

            return BadRequest("Message could not be sent");

        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();
            var messages = await UnitOfWork.MessageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return messages;
        }
        [HttpGet("thread/{username}")]
        // Username in this instance is the recipient
        public async Task<ActionResult<IEnumerable<MessageDTO>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUsername();
            return Ok(await UnitOfWork.MessageRepository.GetMessagesThread(currentUsername, username));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id){

            var username = User.GetUsername();
            var message = await UnitOfWork.MessageRepository.GetMessage(id);

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
                UnitOfWork.MessageRepository.DeleteMessage(message);
            }
            if(await UnitOfWork.Complete()){
                return Ok();
            }
            return BadRequest("Could not delete message");
        }
    }
}