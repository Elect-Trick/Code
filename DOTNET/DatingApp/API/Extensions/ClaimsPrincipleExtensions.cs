using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            // This represents the unique Name prop we set in the Claims principle
            return user.FindFirst(ClaimTypes.Name)?.Value;
        }
        public static int GetUserID(this ClaimsPrincipal user)
        {
            // This represents the unique Name prop we set in the Claims principle
            return int.Parse((user.FindFirst(ClaimTypes.NameIdentifier)?.Value));
        }
    }
}