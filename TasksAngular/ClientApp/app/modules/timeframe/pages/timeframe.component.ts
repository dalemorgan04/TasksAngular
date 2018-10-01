import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { CustomDateAdapter } from '../../shared/datepicker/customDateAdapter/customDateAdapter.component';
import * as moment from 'moment';
import { ITimeframe, TimeframeType, StringLengthType, IMonth, IWeek, months, years} from '../../../models/timeframe.model';

export const datepickerFormats = {
    parse: {
        dateInput: 'D/M/YYYY',
    },
    display: {
        dateInput: 'Do MMM YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'Do MMM YYYY',
        monthYearA11yLabel: 'MMMM YYYY'
    },
};

@Component({
    selector: 'timeframe',
    templateUrl: './timeframe.component.html',
    styleUrls: ['./timeframe.component.scss'],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: datepickerFormats }
    ]
})

export class TimeframeComponent implements OnInit{

    private timeframe: ITimeframe;
    @Input()
    set timeframe(value: ITimeframe) {
        this.timeframe = value;
        switch (this.timeframe.timeframeType) {
            case TimeframeType.Time:
                this.hasTime = true;
                break;
            default:
                this.hasTime = false;
        }
        this.validateTimeframe();
    }
    get timeframe(): ITimeframe {
        return this.timeframe;
    }
    @Output() timeframeChange = new EventEmitter<ITimeframe>();

    private timeframeString: string;

    private tabName: string;
    public tabIndex: number;

    public date: Date;
    public dateControl = new FormControl(moment());
    public hasTime: boolean = false;
    public time: string;
    public weeks: IWeek[];
    public wcDate: Date; //Week Commencing Date
    public weekDisplayString: string; 
    public months: IMonth[] = months;
    public month: number;
    public years: number[] = years;
    public year: number;

    ngOnInit(): void {
        this.validateTimeframe();
    }    

    public tabChanged(event: MatTabChangeEvent) {
        this.tabName = event.tab.textLabel;
        var selectedTimeframeType : TimeframeType;
        switch (this.tabName) {
            case "Anytime":
                selectedTimeframeType = TimeframeType.Open;
                break;
            case "Day":
                selectedTimeframeType = this.hasTime ? TimeframeType.Time : TimeframeType.Date;
                break;
            case "Week":
                selectedTimeframeType = TimeframeType.Week;
                break;
            case "Month":
                selectedTimeframeType = TimeframeType.Month;
                break;
            default: selectedTimeframeType = TimeframeType.Open;
        }
        this.timeframe.timeframeType = selectedTimeframeType;
    }

    public refreshTimeframe() {
        this.validateTimeframe();
        this.timeframeChange.emit(this.timeframe);
    }
    
    public validateTimeframe(): void {

        //If not defined then set default timeframe to now and open
        if (!this.timeframe) {
            this.timeframe =
                {
                    timeframeType: TimeframeType.Open,
                    dateTime: new Date()
                }
        }

        //Validate Timeframe

        switch (this.timeframe.timeframeType) {

            case TimeframeType.Open:
                this.timeframeString = this.getOpenString();
                break;

            case TimeframeType.Date:
                var mDate = moment(this.dateControl.value);
                if (mDate.isValid()) {
                    this.date = new Date(mDate.year(), mDate.month(), mDate.date());
                    //Day
                        this.timeframeString = moment(this.date).format("Do MMM YYYY");
                        this.timeframe = {
                            timeframeType: TimeframeType.Date,
                            dateTime: this.date
                        }
                } else {
                    //Invalid day, even if time checked
                    this.timeframeString = "Choose a date";
                }
                break;
            case TimeframeType.Time:
                var mDateForTime = moment(this.dateControl.value);
                if (mDateForTime.isValid()) {
                    this.date = new Date(mDateForTime.year(), mDateForTime.month(), mDateForTime.date());
                    //Time
                    if (this.hasTime) {
                        if (moment(this.time, "HH:mm").isValid()) {
                            this.timeframeString = moment(this.date).format('Do MMM YYYY') + ' at ' + this.time;
                            this.timeframe = {
                                timeframeType: TimeframeType.Time,
                                dateTime: moment(mDateForTime.format('DD/MM/YYYY') + ' ' + this.time, 'DD/MM/YYYY HH:mm').toDate()
                            }
                        } else {
                            //Invalid time
                            this.timeframeString = "Choose a time";
                        }
                    } else {
                        //Day
                        this.timeframeString = moment(this.date).format("Do MMM YYYY");
                        this.timeframe = {
                            timeframeType: TimeframeType.Date,
                            dateTime: this.date
                        }
                    }
                } else {
                    //Invalid day, even if time checked
                    this.timeframeString = "Choose a date";
                }
                break;
            case TimeframeType.Week:
                this.wcDate = moment(this.wcDate).startOf('isoWeek').toDate();
                var mWcDate = moment(this.wcDate),
                    weekNumber: number = this.getWeekNumberOfMonth(this.wcDate);

                //e.g. 3rd Week of April (20/8/16 - 26/8/16)
                this.weekDisplayString =
                    weekNumber + this.ordinalString(weekNumber) +
                    ' week of ' + mWcDate.format('MMMM YYYY') +
                    '\n(' + mWcDate.format('DD/MM/YY') + ' - ' + moment(mWcDate).add(6, 'days').format('DD/MM/YY') + ')';

                //e.g. W3 of Sep 2018 (20th-6th)
                this.timeframeString =
                    'W' + weekNumber + ' of ' + mWcDate.format('MMM') + ' ' + mWcDate.format('YYYY') +
                    ' (' + mWcDate.format('Do') + '-' + moment(mWcDate).add(6, 'days').format('Do') + ')';

                this.timeframe = {
                    timeframeType: TimeframeType.Week,
                    dateTime: this.wcDate
                }
                break;
            case TimeframeType.Month:
                var monthAsDate = new Date(this.year, this.month, 1);
                this.timeframeString = moment(monthAsDate).format('MMMM YYYY');
                this.timeframe = {
                    timeframeType: TimeframeType.Month,
                    dateTime: monthAsDate
                }
                break;
            default:
        }

        //Initialise all properties
        switch (this.timeframe.timeframeType) {
            case TimeframeType.Open: this.tabIndex = 0;
            case TimeframeType.Date: this.tabIndex = 1;
            case TimeframeType.Time: this.tabIndex = 1;
            case TimeframeType.Week: this.tabIndex = 2;
            case TimeframeType.Month: this.tabIndex = 3;
            default: this.tabIndex = 0;
        }
        var mDateTime: moment.Moment = moment(this.timeframe.dateTime);
        this.date = mDateTime.toDate();
        this.dateControl.setValue(this.date);
        this.time = mDateTime.format("HH:mm");
        this.hasTime = this.timeframe.timeframeType === TimeframeType.Time;
        this.month = mDateTime.month();
        this.year = mDateTime.year();
    }

    private timeframeIsValid(timeframe:ITimeframe) : boolean {
        //TODO: Clean up logic - split all strings into separate funcs. Have checkValid and then UpdateTimeframe, then maybe have InvalidTimeframe. Repeat this logic in cs version object
        return true;
    }

    private getOpenString() {
        return "Anytime";
    }

    private getDateString() {

    }

    private getTimeString() {

    }

    private getDateTimeString() {

    }

    private getWeekString() {

    }

    private getMonthString() {

    }

    private getWeekNumberOfMonth( weekComencingDate : Date) : number {
        var mDate: moment.Moment = moment(weekComencingDate),
            month: number = mDate.month(),
            weekCounter: number = 0,
            loopCounter : number = 0;
        while (mDate.month() === month && loopCounter < 10) {
            weekCounter++;
            mDate.subtract(7, 'days');
            loopCounter++; //Prevent infinite loop
        }
        return weekCounter;
    }

    private ordinalString(n : number) : string {
        if (n === 0) return '';
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
            case 1:  return "st";
            case 2:  return "nd";
            case 3:  return "rd";
            default: return "th";
        }
    }
}
