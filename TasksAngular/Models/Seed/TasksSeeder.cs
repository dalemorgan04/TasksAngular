using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
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

            if (context.Thoughts.Any())
            {
                //Reset data on each run
                context.Thoughts.RemoveRange(context.Thoughts);
            }
            
            /*
            //Using JSON                
            var filepath = Path.Combine(hosting.ContentRootPath, "Models/Seed/SeedThoughts.json");
            var json = File.ReadAllText(filepath);
            var thoughts = JsonConvert.DeserializeObject<IEnumerable<Thought>>(json);
            context.Thoughts.AddRange(thoughts);
            */
            var thoughts = getThoughts();
            context.Thoughts.AddRange(thoughts);

            context.SaveChanges();
            
        }

        private IEnumerable<Thought> getThoughts()
        {
            List<Thought> thoughts = new List<Thought>();

            Thought thought = new Thought()
            {
                Description = "Thought1",
                CreatedDateTime = DateTime.Now,
                TimeFrameId = 0

            };
            thoughts.Add(thought);

            thought = new Thought()
            {
                Description = "Thought2",
                CreatedDateTime = DateTime.Now,
                TimeFrameId = 0
            };
            thoughts.Add(thought);
            return thoughts;
        }
    }
}
