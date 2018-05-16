using AutoMapper;
using Tasks.Service.Thoughts.Dto;
using TasksAngular.Models.Entities;
using TasksAngular.Models.Enum;

namespace Tasks.Service.Thoughts
{
    public class ThoughtDtoMap : Profile
    {
        public ThoughtDtoMap()
        {
            CreateMap<Thought, ThoughtDto>()
                .ForMember(dest => dest.TimeFrame,
                    input => input.MapFrom(i => new TimeFrame((TimeFrameType) i.TimeFrameId, i.TimeFrameDateTime)));
            CreateMap<ThoughtDto, Thought>()
                .ForMember(dest => dest.TimeFrameId,
                    input => input.MapFrom(t => (int) t.TimeFrame.TimeFrameType))
                .ForMember(dest => dest.TimeFrameDateTime,
                    input => input.MapFrom(t => t.TimeFrame.TimeFrameDateTime));
        }
    }
}