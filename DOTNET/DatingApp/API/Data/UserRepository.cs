
using API.DTOs;
using API.Entities;
using API.Helpers;
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
            var user = await _context.Users.Include(z => z.Photos).FirstAsync(z => z.UserName == username);

            if (user != null)
            {
                var photo = user.Photos.FirstOrDefault(z => z.Id == phottoId);
                user.Photos.Remove(photo);

                return await _context.SaveChangesAsync() > 0;


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

      

        public async Task<string> GetMemberGender(string username)
        {
            return await _context.Users.Where(x=>x.UserName== username).Select(x=>x.Gender).FirstOrDefaultAsync();
        }

        public async Task<PagedList<MemberDTO>> GetMembersAsync(UserParams userParams)
        {
            // Using projection renders the Include method obselete since it handles the mapping
            var query = _context.Users.AsQueryable();
            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);

            var minDob = DateTime.Today.AddYears(-userParams.MaxAge-1);
            var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            query = query.Where(u =>u.DateOfBirth >= minDob && u.DateOfBirth <=maxDob);
             query = userParams.OrderBy switch{
                //  Ordering by when the account was registered.
                 "profileRegistered" =>query.OrderByDescending(u=>u.ProfileRegistered),
                 _ =>query.OrderByDescending(u=>u.LastActive)
             };

            // Create async is what our user repo returns where we execute the db query
            return await PagedList<MemberDTO>.CreateAsync(query.ProjectTo<MemberDTO>(_mapper.
            ConfigurationProvider).AsNoTracking(), userParams.PageNumber, userParams.PageSize);
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

        // public async Task<bool> SaveAllAsync()
        // {
        //     // Checks if something has changed and then returns greater than 0 if so 
        //     return _context.SaveChanges() > 0;
        // }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }


    }
}