export enum TimeframeType {
    Open = 0,
    Time = 1,
    Date = 2,
    Week = 3,
    Month = 4
}

export interface ITimeframe {
    timeframeType: TimeframeType,
    dateTime: Date;
}

export interface IMonth {
    value: number;
    viewValue: string;
}

export interface IYear {
    value: number;
}

export const months: IMonth[] = 
[
        { value: 1, viewValue: 'January' },
        { value: 2, viewValue: 'February' },
        { value: 3, viewValue: 'March' },
        { value: 4, viewValue: 'April' },
        { value: 5, viewValue: 'May' },
        { value: 6, viewValue: 'June' },
        { value: 7, viewValue: 'July' },
        { value: 8, viewValue: 'August' },
        { value: 9, viewValue: 'September' },
        { value: 10, viewValue: 'October' },
        { value: 11, viewValue: 'November' },
        { value: 12, viewValue: 'December' }
];

export const years: IYear[] = [
    { value: 2018 },
    { value: 2019 },
    { value: 2020 },
    { value: 2021 },
    { value: 2022 },
    { value: 2023 }
];
