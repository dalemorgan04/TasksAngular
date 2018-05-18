using System;
using System.ComponentModel.DataAnnotations.Schema;
using TasksAngular.Infrastructure.Extension;
using TasksAngular.Models.Enum;

namespace TasksAngular.Models.Entities
{
    [Table("Thoughts")]
    public partial class Thought 
    {
        [Column("ThoughtId")]
        public int ThoughtId { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int SortId { get; set; }
        public int TimeFrameId { get; set; }
        public DateTime TimeFrameDateTime { get; set; }
        public string ProjectId { get; set; }

        public static Thought Create(string description, int sortId, int timeFrameId, DateTime timeFrameDateTime, Project project)
        {
            DateTime validatedTimeFrameDateTime;
            switch ((TimeFrameType)timeFrameId)
            {
                case TimeFrameType.Open:
                    validatedTimeFrameDateTime = new DateTime(2050, 1, 1);
                    break;
                case TimeFrameType.Date:
                    validatedTimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month,
                        timeFrameDateTime.Day);
                    break;
                case TimeFrameType.Time:
                    validatedTimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day,
                                                              timeFrameDateTime.Hour, timeFrameDateTime.Minute, 0);
                    break;
                case TimeFrameType.Week:
                    //Make sure a Monday
                    validatedTimeFrameDateTime =
                        new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day)
                            .StartOfWeek(DayOfWeek.Monday);
                    break;
                case TimeFrameType.Month:
                    validatedTimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, 1);
                    break;
                default:
                    validatedTimeFrameDateTime = new DateTime(2050, 1, 1);
                    break;
            }

            Thought thought = new Thought()
            {
                Description = description,
                CreatedDateTime = DateTime.Now,
                SortId = sortId,
                TimeFrameId = timeFrameId,
                TimeFrameDateTime = validatedTimeFrameDateTime
            };
            return thought;
        }

        public virtual void Update(string description, int timeFrameId, DateTime timeFrameDateTime, Project project)
        {
            TimeFrameId = timeFrameId;
            switch ((TimeFrameType)timeFrameId)
            {
                case TimeFrameType.Open:
                    TimeFrameDateTime = new DateTime(2050, 1, 1);
                    break;
                case TimeFrameType.Date:
                    TimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day);
                    break;
                case TimeFrameType.Time:
                    TimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day, timeFrameDateTime.Hour, timeFrameDateTime.Minute, 0);
                    break;
                case TimeFrameType.Week:
                    //Make sure a Monday
                    TimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day).StartOfWeek(DayOfWeek.Monday);
                    break;
                case TimeFrameType.Month:
                    TimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, 1);
                    break;
            }
        }
    }
}
