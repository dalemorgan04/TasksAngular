using System.Collections.Generic;

namespace TasksAngular.Models.Entities
{
    public partial class HabitEndOnType
    {
        public HabitEndOnType()
        {
            Habits = new HashSet<Habit>();
        }

        public int HabitEndOnTypeId { get; set; }
        public string Name { get; set; }

        public ICollection<Habit> Habits { get; set; }
    }
}
