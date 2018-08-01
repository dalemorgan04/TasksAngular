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
export const months: IMonth[] = 
[
    { number: 1, name: 'January' },
    { number: 2, name: 'February' },
    { number: 3, name: 'March' },
    { number: 4, name: 'April' },
    { number: 5, name: 'May' },
    { number: 6, name: 'June' },
    { number: 7, name: 'July' },
    { number: 8, name: 'August' },
    { number: 9, name: 'September' },
    { number: 10, name: 'October' },
    { number: 11, name: 'November' },
    { number: 12, name: 'December' }
];

export const years: number[] = [2018 ,2019,2020,2021,2022,2023];

