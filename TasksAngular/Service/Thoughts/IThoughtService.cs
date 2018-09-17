using System.Collections.Generic;
using Tasks.Service.Thoughts.Dto;

namespace Tasks.Service.Thoughts
{
    public interface IThoughtService
    {
        IList<ThoughtDto> GetThoughts();
        ThoughtDto GetThought(int id);
        void Save(ThoughtDto thoughtDto);
        void Delete(int thoughtId);
        void UpdateSortId(int thoughtId, int moveToSortId);
    }
}
