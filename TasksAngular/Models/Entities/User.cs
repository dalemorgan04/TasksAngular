using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksAngular.Models.Entities
{
    [Table("Users")]
    public partial class User
    {
        public User()
        {
            Tasks = new HashSet<Task>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public ICollection<Task> Tasks { get; set; }
    }
}
