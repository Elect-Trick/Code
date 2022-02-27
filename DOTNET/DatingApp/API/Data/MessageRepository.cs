using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository : IMessageRepository
    {
        public DataContext Context { get; }
        private readonly IMapper _mapper;
        public MessageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            Context = context;
        }

        public void AddMessage(Message message)
        {
            Context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            Context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await Context.Messages.
            Include(u => u.Recipient).
            Include(u => u.Sender).
            SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PagedList<MessageDTO>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = Context.Messages.OrderByDescending(m => m.MessageSent).AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.Recipient.UserName == messageParams.Username && u.RecipientDeleted == false),
                "Outbox" => query.Where(u => u.Sender.UserName == messageParams.Username && u.SenderDeleted == false),
                _ => query.Where(u => u.Recipient.UserName == messageParams.Username && u.RecipientDeleted == false && u.DateRead == null)
            };
            var messages = query.ProjectTo<MessageDTO>(_mapper.ConfigurationProvider);

            return await PagedList<MessageDTO>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);

        }

        public async Task<IEnumerable<MessageDTO>> GetMessagesThread(string currentUsername, string recipientUsername)
        {
            var messages = await Context.Messages.
            Include(u => u.Sender).ThenInclude(u => u.Photos).
            Include(u => u.Recipient).ThenInclude(u => u.Photos).
            Where(
                m => m.Recipient.UserName == currentUsername && m.RecipientDeleted == false &&
                 m.Sender.UserName == recipientUsername
                 || m.Recipient.UserName == recipientUsername &&
                 m.Sender.UserName == currentUsername).
            OrderBy(m => m.MessageSent).ToListAsync();
            var unreadMessages = messages.Where(m => m.DateRead == null
            && m.Recipient.UserName == currentUsername && m.SenderDeleted == false).
            ToList();

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;

                }
                await Context.SaveChangesAsync();
            }
            return _mapper.Map<IEnumerable<MessageDTO>>(messages);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await Context.SaveChangesAsync() > 0;
        }

        public void AddGroup(Group group)
        {
            Context.Groups.Add(group);
        }

        public void RemoveConnection(Connection connection)
        {
            Context.Connections.Remove(connection);
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await Context.Connections.FindAsync(connectionId);
        }

        public async Task<Group> GetMessageGroup(string groupName)
        {
            return await Context.Groups.Include(x => x.Connections).FirstOrDefaultAsync(z => z.Name == groupName);
        }

        public async Task<Group> GetGroupConnetion(string connectionId)
        {
            return await Context.Groups
            .Include(c => c.Connections)
            .Where(c => c.Connections
            .Any(x => x.ConnectionId == connectionId))
            .FirstOrDefaultAsync();
        }
    }
}