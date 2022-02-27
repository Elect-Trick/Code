using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        // public DbSet<AppUser> Users { get; set; }
        // Not needed since IdentityDbContext provides it
        public DbSet<Photo> Photos { get; set; }
        public DbSet<UserLike> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Connection> Connections { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // This forms the primary key 

            builder.Entity<AppUser>().
            HasMany(ur => ur.UserRoles).
            WithOne(ur => ur.User).
            HasForeignKey(ur => ur.UserId).
            IsRequired(); 
            
            builder.Entity<AppRole>().
            HasMany(ur => ur.UserRoles).
            WithOne(ur => ur.Role).
            HasForeignKey(ur => ur.RoleId).
            IsRequired();


            builder.Entity<UserLike>().HasKey(k => new { k.SourceUserId, k.LikedUserId });

            builder.Entity<UserLike>().HasOne(s => s.SourceUser).WithMany(l => l.LikedUsers).HasForeignKey(s => s.SourceUserId).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<UserLike>().HasOne(s => s.LikedUser).WithMany(l => l.LikedByUsers).HasForeignKey(s => s.LikedUserId).OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Message>().HasOne(u => u.Recipient).WithMany(m => m.MessagesRecieved).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Message>().HasOne(u => u.Sender).WithMany(m => m.MessageSent).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
// DataContext defines the tables we are creating 