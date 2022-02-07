
namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        // Keep it simple, ID will be used for auto incrementation and Primary Key in our DB
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}