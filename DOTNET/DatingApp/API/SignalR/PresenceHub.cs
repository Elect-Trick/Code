
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        public PresenceTracker PresenceTracker { get; }
        public PresenceHub(PresenceTracker presenceTracker)
        {
            PresenceTracker = presenceTracker;
        }

        public override async Task OnConnectedAsync()
        {

            var isOnline = await PresenceTracker.UserConnected(Context.User.GetUsername(), Context.ConnectionId);
            if (isOnline)
                await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUsername());

            var currentUsers = await PresenceTracker.GetOnlineUsers();
            
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }

        public override async Task<bool> OnDisconnectedAsync(Exception ex)
        {
            var userName = Context.User.GetUsername();
            var isOffline = await PresenceTracker.UserDisconnected(userName, Context.ConnectionId);
            if (isOffline)
            {
                await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUsername());
                return true;


            }

            // var currentUsers = await PresenceTracker.GetOnlineUsers();
            // await Clients.All.SendAsync("GetOnlineUsers", currentUsers);
            await base.OnDisconnectedAsync(ex);
            return false;
        }
    }
}