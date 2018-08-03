using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Tasks.Service.Thoughts;
using Tasks.Service.Thoughts.Dto;
using TasksAngular.Models.Entities;

namespace TasksAngular.Service.Thoughts
{
    public class ThoughtService : IThoughtService
    {
        private readonly TasksContext context;

        public ThoughtService(TasksContext context)
        {
            this.context = context;
        }

        public IList<ThoughtDto> GetThoughts()
        {
            using (context)
            {
                var thoughtsList = context.Thoughts
                        .Include(t => t.User)
                        .ToList();
                List<ThoughtDto> thoughtDtoList = Mapper.Map<List<Thought>, List<ThoughtDto>>(thoughtsList);
                return thoughtDtoList;
            }
        }

        public ThoughtDto GetThoughts(int id)
        {
            using (context)
            {
                Thought thought = context.Thoughts
                    .SingleOrDefault(t => t.ThoughtId == id);

                ThoughtDto thoughtDto = Mapper.Map<Thought, ThoughtDto>(thought);
                return thoughtDto;
            }
        }
        
        public async void Save(ThoughtDto thoughtDto)
        {
            using (context)
            {
                Thought thought;
                if (thoughtDto.ThoughtId > 0)
                {
                    thought = context.Thoughts
                        .SingleOrDefaultAsync(t => t.ThoughtId == thoughtDto.ThoughtId)
                        .Result;

                    thought.Update(
                        thoughtDto.Description,
                        (int)thoughtDto.Timeframe.TimeframeType,
                        thoughtDto.Timeframe.TimeframeDateTime,
                        thoughtDto.Project);

                    try
                    {
                        context.Update<Thought>(thought);
                        await context.SaveChangesAsync();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        throw;
                    }
                }
                else
                {
                    thought = Thought.Create(thoughtDto.Description, thoughtDto.SortId, (int)thoughtDto.Timeframe.TimeframeType, thoughtDto.Timeframe.TimeframeDateTime, thoughtDto.Project );
                    context.Thoughts.Add(thought);
                    context.SaveChanges();
                }
            }
        }

        public void Delete(int thoughtId)
        {
        }

        public void UpdateSortId(int thoughtId, int moveToSortId)
        {
            using (context)
            {
                var parameters = new List<SqlParameter>()
                {
                    new SqlParameter("@thoughtId", thoughtId),
                    new SqlParameter("@moveToSortId", moveToSortId)
                };
                var rows = context.Database.ExecuteSqlCommand("EXEC usp_UpdateThoughtSortOrder @thoughtId ,@moveToSortId", parameters.ToArray());
            }
        }
    }
}
