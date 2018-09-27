using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TasksAngular.Infrastructure.Extension;
using TasksAngular.Models.Enum;

namespace TasksAngular.Models.Entities
{
    [Table("Thoughts")]
    public partial class Thought 
    {
        [Key]
        public int ThoughtId { get; set; }
        public User User { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public int SortId { get; set; }
        public int TimeFrameId { get; set; }
        public DateTime TimeFrameDateTime { get; set; }
        public string ProjectId { get; set; }

        public static Thought Create(string description, int sortId, int timeFrameId, DateTime timeFrameDateTime, Project project)
        {
            DateTime validatedTimeFrameDateTime;
            switch ((TimeframeType)timeFrameId)
            {
                case TimeframeType.Open:
                    validatedTimeFrameDateTime = new DateTime(2050, 1, 1);
                    break;
                case TimeframeType.Date:
                    validatedTimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month,
                        timeFrameDateTime.Day);
                    break;
                case TimeframeType.Time:
                    validatedTimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day,
                                                              timeFrameDateTime.Hour, timeFrameDateTime.Minute, 0);
                    break;
                case TimeframeType.Week:
                    //Make sure a Monday
                    validatedTimeFrameDateTime =
                        new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day)
                            .StartOfWeek(DayOfWeek.Monday);
                    break;
                case TimeframeType.Month:
                    validatedTimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, 1);
                    break;
                default:
                    validatedTimeFrameDateTime = new DateTime(2050, 1, 1);
                    break;
            }

            Thought thought = new Thought()
            {
                User = User.GetDefaultUser(),
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
            switch ((TimeframeType)timeFrameId)
            {
                case TimeframeType.Open:
                    TimeFrameDateTime = new DateTime(2050, 1, 1);
                    break;
                case TimeframeType.Date:
                    TimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day);
                    break;
                case TimeframeType.Time:
                    TimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day, timeFrameDateTime.Hour, timeFrameDateTime.Minute, 0);
                    break;
                case TimeframeType.Week:
                    //Make sure a Monday
                    TimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day).StartOfWeek(DayOfWeek.Monday);
                    break;
                case TimeframeType.Month:
                    TimeFrameDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, 1);
                    break;
            }
        }
    }
}
