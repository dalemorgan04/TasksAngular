using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TasksAngular.Repository.Core
{
    public interface IDomainEntity
    {
    }
    public interface IDomainEntity<T> :IDomainEntity
    {
        T Id { get; }
    }
}
