using API.DTOs;
using AutoMapper;
using API.Entities;
using API.Extensions;
using API.SignalR;
using Microsoft.AspNetCore.SignalR;

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
            src.Photos.First(x => x.isMain == true).Url))
            .ForMember(dest => dest.Age, options => options.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDTO>();
            CreateMap<MemberUpdateDTO, AppUser>();
            CreateMap<MemberDTO, AppUser>();
            CreateMap<RegisterDTO, AppUser>();
            CreateMap<RegisterDTO, AppUser>();
            // CreateMap<DateTime, DateTime>().ConvertUsing(date=>DateTime.SpecifyKind(date, DateTimeKind.Utc));
            CreateMap<Message, MessageDTO>().ForMember(dest => dest.SenderPhotoURL, opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.isMain).Url)).ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.isMain).Url));
        }


    }
}