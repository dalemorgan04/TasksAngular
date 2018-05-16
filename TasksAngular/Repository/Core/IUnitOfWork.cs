using System;

namespace TasksAngular.Repository.Core
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();
        void Abort();
        
        //TODO bool IsActive { get; }
    }
}