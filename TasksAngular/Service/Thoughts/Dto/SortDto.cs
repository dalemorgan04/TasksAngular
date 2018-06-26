using System;
using TasksAngular.Models.Entities;

namespace Tasks.Service.Thoughts.Dto
{
    public class SortDto
    {
        public int Id { get; set; }
        public int MoveToSortId { get; set; }
    }
}