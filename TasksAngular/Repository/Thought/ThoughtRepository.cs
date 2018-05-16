﻿using System.Data.SqlClient;
using TasksAngular.Repository.Core;

namespace TasksAngular.Repository.Thought
{
    public class ThoughtRepository : DataAccess, IThoughtRepository
    {
        protected readonly DataAccess dataAccess;
        
        public ThoughtRepository(string connectionString)
            :base(connectionString)
        {
            dataAccess = new DataAccess(connectionString);
        }

        public void UpdateSortId(int thoughtId, int moveToSortId)
        {
            try
            {
                dataAccess.ExecuteStoredProcedure(
                        "usp_UpdateThoughtSortOrder",
                        new SqlParameter("@thoughtId", thoughtId),
                        new SqlParameter("@moveToSortId", moveToSortId)
                    );
            }
            catch
            {
                throw;
            }
        }
    }
}