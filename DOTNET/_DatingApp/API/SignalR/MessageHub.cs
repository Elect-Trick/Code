
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
        public IMapper Mapper { get; }
        private readonly PresenceTracker _presenceTracker;
        public IHubContext<PresenceHub> PresenceHub { get; }
        public IUnitOfWork UnitOfWork { get; }

        public MessageHub(PresenceTracker presenceTracker, IUnitOfWork unitOfWork,IMapper mapper,
        IHubContext<PresenceHub> presenceHub)
        {
            UnitOfWork = unitOfWork;
            PresenceHub = presenceHub;
            _presenceTracker = presenceTracker;
            
            Mapper = mapper;


        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext.Request.Query["user"].ToString();
            var groupName = GetGroupName(Context.User.GetUsername(), otherUser);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
           var group =  await AddToGroup(groupName);
           await Clients.Group(groupName).SendAsync("UpdatedGroup",group);

            var messages = await UnitOfWork.MessageRepository.GetMessagesThread(Context.User.GetUsername(), otherUser);
            if(UnitOfWork.HasChanges()) await UnitOfWork.Complete();
            await Clients.Caller.SendAsync("RecieveMessageThread", messages);

        }
        private string GetGroupName(string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;
            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }

        public override async Task OnDisconnectedAsync(Exception ex)
        {
           var group= await RemoveFromMessageGroup(Context.ConnectionId);
            await Clients.Group(group.Name).SendAsync("UpdatedGroup",group);
            await base.OnDisconnectedAsync(ex);
        }

        public async Task SendMessage(CreateMessageDTO createMessageDTO)
        {
            var username = Context.User.GetUsername();

            if (username == createMessageDTO.RecipientUsername)
            {
                throw new HubException("You cannot send messages to yourself.");

            }

            var sender = await UnitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var recipient = await UnitOfWork.UserRepository.GetUserByUsernameAsync(createMessageDTO.RecipientUsername);

            if (recipient == null)
            {
                throw new HubException("User Not Found");
            }

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = createMessageDTO.RecipientUsername,
                Content = createMessageDTO.Content

            };
            var groupName = GetGroupName(sender.UserName, recipient.UserName);
            var group = await UnitOfWork.MessageRepository.GetMessageGroup(groupName);
            if (group.Connections.Any(x => x.Username == recipient.UserName))
            {
                message.DateRead = DateTime.UtcNow;
            }
            else
            {
                var connections = await _presenceTracker.GetConnectionsForUser(recipient.UserName);
                if (connections != null)
                {
                    await PresenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived",
                    new { username = sender.UserName, knownAs = sender.KnownAs });
                }

            }
            UnitOfWork.MessageRepository.AddMessage(message);

            if (await UnitOfWork.Complete())
            {

                await Clients.Group(groupName).SendAsync("NewMessage", Mapper.Map<MessageDTO>(message));
            }

        }

        public async Task<Group> AddToGroup(string groupName)
        {
            var group = await UnitOfWork.MessageRepository.GetMessageGroup(groupName);
            var connection = new Connection(Context.ConnectionId, Context.User.GetUsername());

            if (group == null)
            {
                group = new Group(groupName);
                UnitOfWork.MessageRepository.AddGroup(group);

            }


            group.Connections.Add(connection);
            if (await UnitOfWork.Complete())
                return group;

            throw new HubException("Failed to Join Group");

        }
        public async Task<Group> RemoveFromMessageGroup(string connectionId)
        {
            var group = await UnitOfWork.MessageRepository.GetGroupConnetion(connectionId);
            var connection = group.Connections.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);

            UnitOfWork.MessageRepository.RemoveConnection(connection);

            if (await UnitOfWork.Complete())
            {
                return group;
            }
            throw new HubException("Failed to remove from group");

        }
    }
}