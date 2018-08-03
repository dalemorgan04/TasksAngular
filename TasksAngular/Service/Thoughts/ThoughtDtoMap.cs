using AutoMapper;
using Tasks.Service.Thoughts.Dto;
using TasksAngular.Models.Entities;
using TasksAngular.Models.Enum;

namespace TasksAngular.Service.Thoughts
{
    public class ThoughtDtoMap : Profile
    {
        public ThoughtDtoMap()
        {
            CreateMap<Thought, ThoughtDto>()
                .ForMember(dest => dest.Timeframe,
                    input => input.MapFrom(i => new Timeframe((TimeframeType) i.TimeFrameId, i.TimeFrameDateTime)));
            CreateMap<ThoughtDto, Thought>()
                .ForMember(dest => dest.TimeFrameId,
                    input => input.MapFrom(t => (int) t.Timeframe.TimeframeType))
                .ForMember(dest => dest.TimeFrameDateTime,
                    input => input.MapFrom(t => t.Timeframe.TimeframeDateTime));
        }
    }
}
