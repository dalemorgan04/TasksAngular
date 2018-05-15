using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksAngular.Models.Entities
{
    [Table("CalendarEvents")]
    public partial class CalendarEvent
    {
        public int CalendarEventId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public int? PriorityId { get; set; }
        public DateTime DateTime { get; set; }
        public bool HasTime { get; set; }
        public int ProjectId { get; set; }
    }
}
