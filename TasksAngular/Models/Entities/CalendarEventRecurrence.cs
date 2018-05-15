using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksAngular.Models.Entities
{
    [Table("CalendarEventRecurrences")]
    public partial class CalendarEventRecurrence
    {
        public int CalendarEventRecurrenceId { get; set; }
        public int CalendarEventId { get; set; }
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
