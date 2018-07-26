enum TimeframeType {
    Open = 0,
    Time = 1,
    Date = 2,
    Week = 3,
    Month = 4
}

interface Timeframe {
    timeframeType: TimeframeType,
    dateTime: Date;
}
