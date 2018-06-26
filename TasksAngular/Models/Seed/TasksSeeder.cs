using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Tasks.Service.Thoughts;
using TasksAngular.Infrastructure.Extension;
using TasksAngular.Models.Entities;

namespace TasksAngular.Models.Seed
{
    public class TasksSeeder
    {
        private readonly TasksContext context;
        private readonly IHostingEnvironment hosting;

        public TasksSeeder(TasksContext context, IHostingEnvironment hosting)
        {
            this.context = context;
            this.hosting = hosting;
        }

        public void Seed()
        {
            context.Database.EnsureCreated();

            if (!context.Thoughts.Any())
            {
                context.Add(User.GetDefaultUser());
                context.SaveChanges();
            }

            context.Thoughts.RemoveRange(context.Thoughts);
            context.SaveChanges();

            if (!context.Thoughts.Any())
            {
                var thoughts = getThoughts();
                context.Thoughts.AddRange(thoughts);

                context.SaveChanges();
            }
        }

        private IEnumerable<Thought> getThoughts()
        {
            List<Thought> thoughts = new List<Thought>();
            User user = context.Users.FirstOrDefault();
            
            Thought thought = new Thought()
            {
                User = user,
                Description = "Open thought",
                CreatedDateTime = DateTime.Now,
                TimeFrameId = 0,
                SortId = 1
            };
            thoughts.Add(thought);

            thought = new Thought()
            {
                User = user,
                Description = "Time thought",
                CreatedDateTime = DateTime.Now,
                TimeFrameId = 1,
                SortId = 2,
                TimeFrameDateTime = DateTime.Now
            };
            thoughts.Add(thought);

            thought = new Thought()
            {
                User = user,
                Description = "Today thought",
                CreatedDateTime = DateTime.Now,
                TimeFrameId = 2,
                SortId = 3,
                TimeFrameDateTime = DateTime.Today
            };
            thoughts.Add(thought);

            thought = new Thought()
            {
                User = user,
                Description = "Tomorrow thought",
                CreatedDateTime = DateTime.Now,
                TimeFrameId = 1,
                SortId = 4,
                TimeFrameDateTime = DateTime.Today.AddDays(1)
            };
            thoughts.Add(thought);

            thought = new Thought()
            {
                User = user,
                Description = "This Week thought",
                CreatedDateTime = DateTime.Now,
                TimeFrameId = 3,
                SortId = 5,
                TimeFrameDateTime = DateTime.Today.StartOfWeek(DayOfWeek.Monday)
            };
            thoughts.Add(thought);

            thought = new Thought()
            {
                User = user,
                Description = "Next Week thought",
                CreatedDateTime = DateTime.Now,
                TimeFrameId = 1,
                SortId = 6,
                TimeFrameDateTime = DateTime.Today.AddDays(7).StartOfWeek(DayOfWeek.Monday)
            };
            thoughts.Add(thought);

            thought = new Thought()
            {
                User = user,
                Description = "This Month thought",
                CreatedDateTime = DateTime.Now,
                TimeFrameId = 4,
                SortId = 7,
                TimeFrameDateTime = DateTime.Today
            };
            thoughts.Add(thought);
            return thoughts;
        }
    }
}
