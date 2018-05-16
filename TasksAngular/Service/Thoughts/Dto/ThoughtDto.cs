using System;
using TasksAngular.Models.Entities;

namespace Tasks.Service.Thoughts.Dto
{
    public class ThoughtDto
    {
        public int Id { get; set; }
        public User User { get; set; }
        public string Description { get; set; }
        public Priority Priority { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int SortId { get; set; }
        public TimeFrame TimeFrame { get; set; }
        public Project Project { get; set; }
    }
}