using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksAngular.Models.Entities
{
    [Table("HabitRecurrences")]
    public partial class HabitRecurrence
    {
        public int HabitRecurrenceId { get; set; }
        public int HabitId { get; set; }
        public int IntervalType { get; set; }
        public int RepeatEveryCount { get; set; }
        public int? DayOfWeek { get; set; }
        public int? DayOfMonth { get; set; }
        public int? WeekdayOfMonth { get; set; }
        public int? WeekOfYear { get; set; }
        public int? MonthNo { get; set; }
        public DateTime StartOnDate { get; set; }
    }
}
