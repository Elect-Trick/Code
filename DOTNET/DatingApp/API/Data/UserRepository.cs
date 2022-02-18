
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> DeletePhoto(int phottoId, string username)
        {
            var user = await _context.Users.Include(z => z.Photos).FirstAsync(z =>z.UserName ==username);
            
            if (user != null)
            {
                var photo = user.Photos.FirstOrDefault(z => z.Id == phottoId);
               user.Photos.Remove(photo);

             return await _context.SaveChangesAsync()>0;


            }
            else
            {
                return false;
            }
        }

        public async Task<MemberDTO> GetMemberAsync(string username)
        {
            return await _context.Users.Where(x => x.UserName == username).ProjectTo<MemberDTO>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<MemberDTO>> GetMembersAsync()
        {
            // Using projection renders the Include method obselete since it handles the mapping
            return await _context.Users.ProjectTo<MemberDTO>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);

        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {

            return await _context.Users.Include(p => p.Photos).
            SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(p => p.Photos).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            // Checks if something has changed and then returns greater than 0 if so 
            return  _context.SaveChanges() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }


    }
}