import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

    @Input() timeframe: ITimeframe;
    @Output() timeframeChange = new EventEmitter<ITimeframe>();
    private timeframeString : string;

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
        //If not defined then set default timeframe to now and open
        if (!this.timeframe) {
            this.timeframe = 
            {
                timeframeType: TimeframeType.Open,
                dateTime: new Date()
            }
        }
        //Initialise all properties
        switch (this.timeframe.timeframeType) {
            case TimeframeType.Open:  this.tabIndex = 0;
            case TimeframeType.Date:  this.tabIndex = 1;
            case TimeframeType.Time:  this.tabIndex = 1;
            case TimeframeType.Week:  this.tabIndex = 2;
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

    public tabChanged(event: MatTabChangeEvent) {
        this.tabName = event.tab.textLabel;
        this.updateTimeframe();
    }

    public updateTimeframe() : void {
        switch (this.tabName) {
            case "Anytime":
                this.timeframeString = "Anytime";
                this.timeframe.timeframeType = TimeframeType.Open;
                break;
            case "Day":
                var mDate = moment(this.dateControl.value);
                if (mDate.isValid()) {
                    this.date = new Date(mDate.year(), mDate.month(), mDate.date());
                    //Time
                    if (this.hasTime) {
                        if (moment(this.time, "HH:mm").isValid()) {
                            this.timeframeString = moment(this.date).format('Do MMM YYYY') + ' at ' + this.time;
                            this.timeframe = {
                                timeframeType: TimeframeType.Time,
                                dateTime: moment(mDate.format('DD/MM/YYYY')+' '+ this.time, 'DD/MM/YYYY HH:mm').toDate()
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
            case "Week":
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
            case "Month":
                var monthAsDate = new Date(this.year, this.month, 1);
                this.timeframeString = moment(monthAsDate).format('MMMM YYYY');
                this.timeframe = {
                    timeframeType: TimeframeType.Month,
                    dateTime: monthAsDate
                }
                break;
            default:
        }
        this.timeframeChange.emit(this.timeframe);
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
