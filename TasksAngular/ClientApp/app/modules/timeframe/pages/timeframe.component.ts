import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, SimpleChange } from '@angular/core';
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

    private _timeframe: ITimeframe;
    @Input() //TODO: CHange this input to be an observable not an object. You can only monitor simplechanges using ngOnChange
    set timeframe(value: ITimeframe) {
        this._timeframe = value;
        switch (this._timeframe.timeframeType) {
            case TimeframeType.Time:
                this.hasTime = true;
                break;
            default:
                this.hasTime = false;
        }
        this.updateTimeframe();
    }
    get timeframe(): ITimeframe { return this._timeframe }

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
        this.updateTimeframe();
    }

    ngOnChanges(changes: { [timeframe: ITimeframe] : SimpleChange }) {

    }

    public updateTimeframe(): void {

        //If not defined then set default timeframe to now and open
        if (!this._timeframe) {
            this._timeframe =
                {
                    timeframeType: TimeframeType.Open,
                    dateTime: new Date()
                }
        }

        //Activate tab
        switch (this._timeframe.timeframeType) {
            case TimeframeType.Open: this.tabIndex = 0;
            case TimeframeType.Date: this.tabIndex = 1;
            case TimeframeType.Time: this.tabIndex = 1;
            case TimeframeType.Week: this.tabIndex = 2;
            case TimeframeType.Month: this.tabIndex = 3;
            default: this.tabIndex = 0;
        }

        //Update all properties
        var mDateTime: moment.Moment = moment(this._timeframe.dateTime);
        this.date = mDateTime.toDate();
        this.dateControl.setValue(this.date);
        this.time = mDateTime.format("HH:mm");
        this.hasTime = this._timeframe.timeframeType === TimeframeType.Time;
        this.month = mDateTime.month();
        this.year = mDateTime.year();

        //Update timeframe Strings
        switch (this._timeframe.timeframeType) {

            case TimeframeType.Open:
                this.timeframeString = "Anytime";

            case TimeframeType.Time:
                this.timeframeString = moment(this.date).format('Do MMM YYYY') + ' at ' + this.time;

            case TimeframeType.Date:
                this.timeframeString = moment(this._timeframe.dateTime).format("Do MMM YYYY");

            case TimeframeType.Week:
                let
                    mWcDate = moment(this.wcDate),
                    weekNumber: number = this.getWeekNumberOfMonth(this.wcDate);
                    //e.g. W3 of Sep 2018 (20th-6th)
                this.timeframeString = 
                    'W' + weekNumber + ' of ' + mWcDate.format('MMM') + ' ' + mWcDate.format('YYYY') +
                    ' (' + mWcDate.format('Do') + '-' + moment(mWcDate).add(6, 'days').format('Do') + ')';
                    //e.g. 3rd Week of April (20/8/16 - 26/8/16)
                this.weekDisplayString =
                    weekNumber + this.ordinalString(weekNumber) +
                    ' week of ' + mWcDate.format('MMMM YYYY') +
                    '\n(' + mWcDate.format('DD/MM/YY') + ' - ' + moment(mWcDate).add(6, 'days').format('DD/MM/YY') + ')';

            case TimeframeType.Month:
                var monthAsDate = new Date(this.year, this.month, 1);
                this.timeframeString = moment(monthAsDate).format('MMMM YYYY');
                this._timeframe = {
                    timeframeType: TimeframeType.Month,
                    dateTime: monthAsDate
                }
                break;
            default:
                this.timeframeString = "";
        }

        //Signal change
        this.timeframeChange.emit(this._timeframe);
    }

    public onDayTabChange() {
        let mDateTime = moment(this.dateControl.value);
        if (mDateTime.isValid()) {
            this._timeframe.dateTime = new Date(mDateTime.year(), mDateTime.month(), mDateTime.date());
            //Time
            if (this.hasTime) {
                if (moment(this._timeframe.dateTime, "HH:mm").isValid()) {
                    this._timeframe = {
                        timeframeType: TimeframeType.Time,
                        dateTime: moment( mDateTime.format('DD/MM/YYYY') + ' ' + this.time, 'DD/MM/YYYY HH:mm').toDate()
                    }
                } else {
                    //Invalid time
                    this.timeframeString = "Choose a time";
                }
            } else {
            //Day
                this._timeframe = {
                    timeframeType: TimeframeType.Date,
                    dateTime: this.date
                }
            }
        } else {
            //Invalid day, even if time checked
            this.timeframeString = "Choose a date";
        }
        this.updateTimeframe();
    }

    public onWeekTabChange() {
        this.wcDate = moment(this.wcDate).startOf('isoWeek').toDate();
        this._timeframe = {
            timeframeType: TimeframeType.Week,
            dateTime: this.wcDate
        }
        this.updateTimeframe();
    }

    public onMonthTabChange() {
        var monthAsDate = new Date(this.year, this.month, 1);
        this.timeframeString = moment(monthAsDate).format('MMMM YYYY');
        this._timeframe = {
            timeframeType: TimeframeType.Month,
            dateTime: monthAsDate
        }
        this.updateTimeframe();
    }

    public onTabSwitched(event: MatTabChangeEvent) {
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
        this._timeframe.timeframeType = selectedTimeframeType;
        this.updateTimeframe();
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
