using Microsoft.AspNetCore.Authorization;
using API.Extensions;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    // [Authorize]
    [Table("Users")]

    public class AppUser : IdentityUser<int>
    {

        // IdentityUser already implements the ID,username and Password hash 
        // public int Id { get; set; }
        //     // Keep it simple, ID will be used for auto incrementation and Primary Key in our DB
        //     public string UserName { get; set; }
        //     public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTimeOffset ProfileRegistered { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }

        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }
        // Users that liked me
        public ICollection<UserLike> LikedByUsers { get; set; }
        // Users I liked
        public ICollection<UserLike> LikedUsers { get; set; }
        public ICollection<Message> MessageSent { get; set; }
        public ICollection<Message> MessagesRecieved { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }







    }
}


