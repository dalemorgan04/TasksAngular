using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Tasks.Service.Thoughts;
using Tasks.Service.Thoughts.Dto;
using TasksAngular.Models.Entities;
using TasksAngular.Models.Enum;
using TasksAngular.Service.Thoughts.Dto;
using TasksAngular.ViewModels.Thoughts;

namespace TasksAngular.Controllers
{
    [Produces("application/json")]
    public class ThoughtsController : Controller
    {
        private readonly IThoughtService thoughtService;

        public ThoughtsController(IThoughtService thoughtService)
        {
            this.thoughtService = thoughtService;
        }

        [HttpGet]
        [Route("api/Thoughts/List")]
        public ThoughtsViewModel GetThoughtsList()
        {
            List<ThoughtDto> thoughtDtoList = thoughtService.GetThoughts().ToList();
            ThoughtsViewModel viewModel = new ThoughtsViewModel()
            {
                ThoughtsList = new List<ThoughtViewModel>()
            };
            foreach (var thoughtDto in thoughtDtoList)
            {
                var thought = new ThoughtViewModel()
                {
                    ThoughtId = thoughtDto.ThoughtId,
                    UserId = thoughtDto.User.UserId,
                    Description = thoughtDto.Description,
                    CreatedDateTime = thoughtDto.CreatedDateTime,
                    SortId = thoughtDto.SortId,
                    PriorityId = thoughtDto.Priority?.PriorityId ?? 0,
                    TimeFrameId = (int) thoughtDto.Timeframe.TimeframeType,
                    TimeFrameDateString = thoughtDto.Timeframe.DateString,
                    TimeFrameTimeString = thoughtDto.Timeframe.TimeString,
                    TimeFrameWeekString = thoughtDto.Timeframe.WeekString,
                    TimeFrameDueString = thoughtDto.Timeframe.DueString
                };
                viewModel.ThoughtsList.Add(thought);
            }
            return viewModel;
        }

        [HttpGet]
        [Route("api/Thoughts/GetEdit")]
        public EditThoughtViewModel GetEditThought(int thoughtId)
        {
            var thoughtDto = this.thoughtService.GetThought(thoughtId);
            var viewModel = new EditThoughtViewModel()
            {
                Id = thoughtDto.ThoughtId,
                DateTime = thoughtDto.Timeframe.TimeframeDateTime,
                Description = thoughtDto.Description,
                TimeframeType = thoughtDto.Timeframe.TimeframeType
            };
            return viewModel;
        }

        [HttpPost]
        [Route("api/Thoughts/Add")]
        public Boolean AddThought([FromBody]AddThoughtViewModel thought)
        {
            try
            {
                var thoughtDto = new ThoughtDto()
                {
                    User = Models.Entities.User.GetDefaultUser(),
                    Description = thought.Description,
                    Timeframe = new Timeframe(thought.TimeframeType, thought.DateTime)
                };
                thoughtService.Save(thoughtDto);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        [HttpPost]
        [Route("api/Thoughts/Sort")]
        public Boolean UpdateSortId([FromBody]SortDto sort)
        {
            try
            {
                thoughtService.UpdateSortId(sort.Id, sort.MoveToSortId);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
