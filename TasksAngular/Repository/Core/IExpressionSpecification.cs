using System;
using System.Linq.Expressions;

namespace TasksAngular.Repository.Core
{
    public interface IExpressionSpecification<T> : ISpecification<T>
        where T : class
    {
        Expression<Func<T, bool>> SpecExpression { get; }
    }
}