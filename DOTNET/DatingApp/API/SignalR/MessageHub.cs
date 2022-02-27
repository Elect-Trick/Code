
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
        public IMessageRepository MessageRepository { get; }
        private readonly IUserRepository _userRepository;
        private readonly PresenceTracker _presenceTracker;
        public IHubContext<PresenceHub> PresenceHub { get; }

        public MessageHub(PresenceTracker presenceTracker, IMessageRepository messageRepository, IMapper mapper, IUserRepository userRepository,
        IHubContext<PresenceHub> presenceHub)
        {
            PresenceHub = presenceHub;
            _presenceTracker = presenceTracker;
            _userRepository = userRepository;
            MessageRepository = messageRepository;
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

            var messages = await MessageRepository.GetMessagesThread(Context.User.GetUsername(), otherUser);
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

            var sender = await _userRepository.GetUserByUsernameAsync(username);
            var recipient = await _userRepository.GetUserByUsernameAsync(createMessageDTO.RecipientUsername);

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
            var group = await MessageRepository.GetMessageGroup(groupName);
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
            MessageRepository.AddMessage(message);

            if (await MessageRepository.SaveAllAsync())
            {

                await Clients.Group(groupName).SendAsync("NewMessage", Mapper.Map<MessageDTO>(message));
            }

        }

        public async Task<Group> AddToGroup(string groupName)
        {
            var group = await MessageRepository.GetMessageGroup(groupName);
            var connection = new Connection(Context.ConnectionId, Context.User.GetUsername());

            if (group == null)
            {
                group = new Group(groupName);
                MessageRepository.AddGroup(group);

            }


            group.Connections.Add(connection);
            if (await MessageRepository.SaveAllAsync())
                return group;

            throw new HubException("Failed to Join Group");

        }
        public async Task<Group> RemoveFromMessageGroup(string connectionId)
        {
            var group = await MessageRepository.GetGroupConnetion(connectionId);
            var connection = group.Connections.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);

            MessageRepository.RemoveConnection(connection);

            if (await MessageRepository.SaveAllAsync())
            {
                return group;
            }
            throw new HubException("Failed to remove from group");

        }
    }
}