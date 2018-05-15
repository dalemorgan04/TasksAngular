using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksAngular.Models.Entities
{
    [Table("Tasks")]
    public partial class Task
    {
        public int TaskId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public int? PriorityId { get; set; }
        public int TimeFrameId { get; set; }
        public DateTime TimeFrameDateTime { get; set; }
        public bool IsComplete { get; set; }
        public int? ProjectId { get; set; }

        public Priority Priority { get; set; }
        public User User { get; set; }
    }
}
