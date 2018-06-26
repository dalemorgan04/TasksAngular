using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Tasks.Service.Thoughts.Dto;
using TasksAngular.Models.Entities;

namespace Tasks.Service.Thoughts
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
            var thoughtsList = context.Thoughts
                    .Include(t => t.User)
                    .ToList();
            List<ThoughtDto> thoughtDtoList = Mapper.Map<List<Thought>, List<ThoughtDto>>(thoughtsList);
            return thoughtDtoList;
        }

        public ThoughtDto GetThoughts(int id)
        {
            Thought thought = context.Thoughts
                .SingleOrDefault(t => t.ThoughtId == id);

            ThoughtDto thoughtDto = Mapper.Map<Thought, ThoughtDto>(thought);
            return thoughtDto;
        }
        
        public async void Save(ThoughtDto thoughtDto)
        {
            Thought thought;
            if (thoughtDto.Id > 0)
            {
                thought = context.Thoughts
                    .SingleOrDefaultAsync(t => t.ThoughtId == thoughtDto.Id)
                    .Result;

                thought.Update(
                    thoughtDto.Description,
                    (int)thoughtDto.TimeFrame.TimeFrameType,
                    thoughtDto.TimeFrame.TimeFrameDateTime,
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
                thought = Thought.Create(thoughtDto.Description, thoughtDto.SortId, (int)thoughtDto.TimeFrame.TimeFrameType, thoughtDto.TimeFrame.TimeFrameDateTime, thoughtDto.Project );
                
                context.SaveChanges();
            }
        }

        public void Delete(int thoughtId)
        {
            
        }

        public void UpdateSortId(int thoughtId, int moveToSortId)
        {
            //context.Database.ExecuteSqlCommand("usp_UpdateThoughtSortOrder @p0, @p1",
            //    parameters: new[] {thoughtId, moveToSortId});

            //var rows = 
            var parameters = new List<SqlParameter>()
            {
                new SqlParameter("@thoughtId", thoughtId),
                new SqlParameter("@moveToSortId", moveToSortId)
            };
            context.Database.ExecuteSqlCommand("EXEC usp_UpdateThoughtSortOrder @thoughtId ,@moveToSortId", parameters.ToArray());
        }
    }
}