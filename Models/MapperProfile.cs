using AutoMapper;
using Facit.Models;
using Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Person, PersonDetailsDTO>();
        }
    }
}
