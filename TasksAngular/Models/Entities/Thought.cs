using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TasksAngular.Models.Entities
{
    [Table("Thoughts")]
    public partial class Thought
    {
        public int ThoughtId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int SortId { get; set; }
        public int TimeFrameId { get; set; }
        public DateTime TimeFrameDateTime { get; set; }
        public string ProjectId { get; set; }
    }
}
