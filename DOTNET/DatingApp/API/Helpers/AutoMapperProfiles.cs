using API.DTOs;
using AutoMapper;
using API.Entities;
using API.Extensions;

namespace API.Helpers
{

    // Helps with mapping one object to another
    //  so we don't return all the fields in the db to the user
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // CreateMap(fromDTO, toDTO)
            // CreateMap<AppUser, IEnumerable<MemberDTO>>();
            CreateMap<AppUser, MemberDTO>().ForMember(dest => dest.PhotoUrl, options => options.MapFrom(src =>
            src.Photos.First(x =>  x.isMain==true).Url))
            .ForMember(dest =>dest.Age, options=> options.MapFrom(src=>src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDTO>();
        }


    }
}