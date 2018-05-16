namespace TasksAngular.Repository.Thought
{
    public interface IThoughtRepository
    {
        void UpdateSortId(int thoughtId, int moveToId);
    }
}