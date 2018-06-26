using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mime;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tasks.Service.Thoughts;
using Tasks.Service.Thoughts.Dto;
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
        [Route("api/Thoughts/Index")]
        public ThoughtsViewModel GetThoughtsTable()
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
                    Id = thoughtDto.Id,
                    UserId = thoughtDto.User.UserId,
                    Description = thoughtDto.Description,
                    CreatedDateTime = thoughtDto.CreatedDateTime,
                    SortId = thoughtDto.SortId,
                    PriorityId = thoughtDto.Priority?.PriorityId ?? 0,
                    TimeFrameId = (int) thoughtDto.TimeFrame.TimeFrameType,
                    TimeFrameDateString = thoughtDto.TimeFrame.DateString,
                    TimeFrameTimeString = thoughtDto.TimeFrame.TimeString,
                    TimeFrameWeekString = thoughtDto.TimeFrame.WeekString,
                    TimeFrameDueString = thoughtDto.TimeFrame.DueString
                };
                viewModel.ThoughtsList.Add(thought);
            }
            return viewModel;
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
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}