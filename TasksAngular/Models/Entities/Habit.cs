using System;
using System.ComponentModel.DataAnnotations.Schema;
using TasksAngular.Models.Enum;

namespace TasksAngular.Models.Entities
{
    [Table("Habits")]
    public partial class Habit
    {
        public int HabitId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public int? PriorityId { get; set; }
        public int TimeFrameId { get; set; }
        public DateTime DateTime { get; set; }
        public int? Count { get; set; }
        public bool IsComplete { get; set; }
        public DateTime EndOnDate { get; set; }
        public int? EndOnCount { get; set; }
        public int EndOnType { get; set; }
        public int ProjectId { get; set; }
        public HabitEndOnType EndOnTypeNavigation { get; set; }
    }
}
