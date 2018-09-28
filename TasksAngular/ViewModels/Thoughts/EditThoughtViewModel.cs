using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TasksAngular.Models.Enum;

namespace TasksAngular.ViewModels.Thoughts
{
    public class EditThoughtViewModel
    {
        public int  Id { get; set; }
        public string Description { get; set; }
        public TimeframeType TimeframeType { get; set; }
        public DateTime DateTime { get; set; }
    }
}
