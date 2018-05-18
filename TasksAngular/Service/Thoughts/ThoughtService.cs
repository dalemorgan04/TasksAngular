using System;
using System.Collections.Generic;
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
            var thoughtList = context.Thoughts.ToList();
            List<ThoughtDto> thoughtDtoList = Mapper.Map<List<Thought>, List<ThoughtDto>>(thoughtList);
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
            //TODO: Build in store proc
        }
    }
}