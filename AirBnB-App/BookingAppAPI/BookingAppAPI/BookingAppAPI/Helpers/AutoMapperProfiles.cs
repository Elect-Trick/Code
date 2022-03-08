using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppAPI.Models;

namespace BookingAppAPI.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {

      CreateMap<LoginModel, ApplicationUser>();

    }


  }
}
