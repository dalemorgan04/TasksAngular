export enum TimeframeType {
    Open = 0,
    Time = 1,
    Date = 2,
    Week = 3,
    Month = 4
}

export enum StringLengthType {
    Short = 0,
    Long = 1
}

export interface ITimeframe {
    timeframeType: TimeframeType,
    dateTime: Date;
}

export interface IWeek {
    wcDate: Date,
    toString: string;
}

export interface IMonth {
    number: number;
    name: string;
}
//All Dates use Jan = 0 so comply with convention
export const months: IMonth[] = 
[
    { number: 0,  name: 'January' },
    { number: 1,  name: 'February' },
    { number: 2,  name: 'March' },
    { number: 3,  name: 'April' },
    { number: 4,  name: 'May' },
    { number: 5,  name: 'June' },
    { number: 6,  name: 'July' },
    { number: 7,  name: 'August' },
    { number: 8,  name: 'September' },
    { number: 9,  name: 'October' },
    { number: 10, name: 'November' },
    { number: 11, name: 'December' }
];

export const years: number[] = [2018 ,2019,2020,2021,2022,2023];
