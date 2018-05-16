using System;
using System.Linq.Expressions;

namespace TasksAngular.Repository.Core
{
    public abstract class ExpressionSpecificationBase<T> : IExpressionSpecification<T> where T : class
    {
        public abstract Expression<Func<T, bool>> SpecExpression { get; }
    }
}