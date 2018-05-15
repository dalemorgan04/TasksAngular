using System.Collections.Generic;

namespace TasksAngular.Models.Entities
{
    public partial class Priority
    {
        public Priority()
        {
            Tasks = new HashSet<Task>();
        }

        public int PriorityId { get; set; }
        public string Description { get; set; }

        public ICollection<Task> Tasks { get; set; }
    }
}
