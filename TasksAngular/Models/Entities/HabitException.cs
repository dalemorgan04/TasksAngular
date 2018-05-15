using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksAngular.Models.Entities
{
    [Table("HabitExceptions")]
    public partial class HabitException
    {
        public int HabitExceptionId { get; set; }
        public int HabitReccurrenceId { get; set; }
        public int HabitId { get; set; }
        public DateTime DateTime { get; set; }
        public bool IsHidden { get; set; }
    }
}
