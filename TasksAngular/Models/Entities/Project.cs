using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksAngular.Models.Entities
{
    [Table("Projects")]
    public partial class Project
    {
        public int ProjectId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public int? PriorityId { get; set; }
        public int? TimeFrameId { get; set; }
        public DateTime DateTime { get; set; }
        public bool IsComplete { get; set; }
    }
}
