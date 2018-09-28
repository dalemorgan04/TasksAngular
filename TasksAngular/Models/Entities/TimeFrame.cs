using System;
using System.Globalization;
using TasksAngular.Infrastructure.Extension;
using TasksAngular.Models.Enum;

namespace TasksAngular.Models.Entities
{
    public class Timeframe
    {
        private readonly TimeframeType timeframeType;
        private readonly DateTime timeframeDateTime;

        public TimeframeType TimeframeType => timeframeType;
        public DateTime TimeframeDateTime => timeframeDateTime;
        public String DateString => timeframeDateTime.ToString("dd/MM/yyyy");
        public string TimeString => timeframeDateTime.ToString("HH:mm");
        public string WeekString => getWeekString();
        public String DueString => getDueString();


        public Timeframe()
        {
            this.timeframeType = TimeframeType.Open;
            this.timeframeDateTime = new DateTime(2050,1,1); //Set date due to far off into the future
        }

        public Timeframe(TimeframeType timeframeType, DateTime timeFrameDateTime)
        {
            this.timeframeType = timeframeType;
            switch (timeframeType)
            {
                case TimeframeType.Date:
                    this.timeframeDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day);
                    break;
                case TimeframeType.Time:
                    this.timeframeDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day,
                                                          timeFrameDateTime.Hour, timeFrameDateTime.Minute, 0);
                    break;
                case TimeframeType.Week:
                    this.timeframeDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, timeFrameDateTime.Day)
                                                          .StartOfWeek(DayOfWeek.Monday);
                    break;
                case TimeframeType.Month:
                    this.timeframeDateTime = new DateTime(timeFrameDateTime.Year, timeFrameDateTime.Month, 1);
                    break;
                default:
                    this.timeframeDateTime = new DateTime(2050, 1, 1);
                    break;
            }
        }

        private string getDueString()
        {
            switch (TimeframeType)
            {
                case TimeframeType.Open:
                    return "";
                case TimeframeType.Time:
                    string timeString = TimeframeDateTime.ToString("h:mmtt").ToLower();
                    return $"{getDateString()} at {timeString}";
                case TimeframeType.Date:
                    return getDateString();
                case TimeframeType.Week:
                    return getWeekString();
                case TimeframeType.Month:
                    return TimeframeDateTime.ToString("MMMM yy");
                default:
                    return "";
            }
        }

        private string getDateString()
        { 
            int daysAway = Math.Abs((TimeframeDateTime - DateTime.Now).Days);
            bool inPast = TimeframeDateTime < DateTime.Now;
            //If less than a week state the day name
            switch (daysAway)
            {
                case 0:
                    return $"Today";
                case 1:
                    if (inPast)
                    {
                        return $"Yesterday";
                    }
                    else
                    {
                        return $"Tomorrow";
                    }
                default:
                    if (daysAway <= 7)
                    {
                        string weekday = TimeframeDateTime.ToString("dddd");
                        if (inPast)
                        {
                            return $"Last {weekday}";
                        }
                        else
                        {
                            return weekday;
                        }
                    }
                    else
                    {
                        return TimeframeDateTime.ToString("d/M/yy");
                    }
            }
        }

        private string getTimeString()
        {

        }

        private string getDateTimeString()
        {

        }

        private string getWeekString()
        {
            if (timeframeType != TimeframeType.Week)
            {
                return "";
            }
            else
            {

                DateTime from = new DateTime(timeframeDateTime.Year, timeframeDateTime.Month, timeframeDateTime.Day);
                DateTime to = new DateTime(timeframeDateTime.AddDays(7).Year, timeframeDateTime.AddDays(7).Month,
                    timeframeDateTime.AddDays(7).Day);
                var cal = DateTimeFormatInfo.CurrentInfo.Calendar;
                int weekNo = cal.GetWeekOfYear(from, CalendarWeekRule.FirstDay, DayOfWeek.Monday);
                string fromString;
                string toString = to.ToString("d/M/yy");
                if (from.Year == to.Year)
                {
                    if (from.Month == to.Month)
                    {
                        fromString = from.ToString("d");
                    }
                    else
                    {
                        fromString = from.ToString("d/M");
                    }
                }
                else
                {
                    fromString = from.ToString("d/M/yy");
                }
                return $"W{weekNo} ({fromString} - {toString})";
            }
        }

        private string getMonthString()
        {

        }

    }
}
