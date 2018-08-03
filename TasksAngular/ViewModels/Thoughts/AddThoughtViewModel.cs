using System;
using TasksAngular.Models.Enum;

namespace TasksAngular.ViewModels.Thoughts
{
    public class AddThoughtViewModel
    {
        public string Description { get; set; }
        public TimeframeType TimeframeType { get; set; }
        public DateTime DateTime { get; set; }
    }
}

