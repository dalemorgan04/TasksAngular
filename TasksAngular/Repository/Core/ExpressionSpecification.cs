using System;
using System.Linq.Expressions;

namespace TasksAngular.Repository.Core
{
    public class ExpressionSpecification<T> : ExpressionSpecificationBase<T> where T : class
    {
        private readonly Expression<Func<T, bool>> specExpression;

        public ExpressionSpecification(Expression<Func<T, bool>> specExpression)
        {
            this.specExpression = specExpression;
        }

        public override Expression<Func<T, bool>> SpecExpression
        {
            get { return this.specExpression; }
        }
    }
}