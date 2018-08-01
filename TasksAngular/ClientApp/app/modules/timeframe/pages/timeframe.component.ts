import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTab, MatTabChangeEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ITimeframe, TimeframeType, StringLengthType, IMonth, IWeek, months, years} from '../../../models/timeframe.model';
import * as moment from 'moment';

export const datepickerFormats = {
    parse: {
        dateInput: 'D/M/YYYY',
    },
    display: {
        dateInput: 'D/M/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'D/M/YYYY',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'timeframe',
    templateUrl: './timeframe.component.html',
    styleUrls: ['./timeframe.component.scss'],
    providers: [
        //// `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        //// application's root module. We provide it at the component level here, due to limitations of
        //// our example generation script.
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
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

    public updateTimeframe() {
        switch (this.tabName) {
            case "Anytime":
                this.timeframeString = "Anytime";
                this.timeframe.timeframeType = TimeframeType.Open;
                break;
            case "Day":
                if (moment(this.dateControl.value).isValid()) {
                    this.date = moment(this.dateControl.value).minutes(0).hours(0).toDate();
                    //Time
                    if (this.hasTime) {
                        if (moment(this.time, "HH:mm").isValid()) {
                            this.timeframeString = moment(this.date).format('Do MMM YYYY') + ' at ' + this.time;
                            this.timeframe = {
                                timeframeType: TimeframeType.Time,
                                dateTime: moment(this.date +' '+ this.time, 'DD/MM/YYY HH:mm').toDate()
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
                var mDate = moment(this.wcDate),
                    weekNumber: number = this.getWeekNumberOfMonth(this.wcDate);

                //e.g. 3rd Week of April (20/8/16 - 26/8/16)
                this.weekDisplayString =
                    weekNumber + this.ordinalString(weekNumber) +
                    ' week of ' + mDate.format('MMMM YYYY') +
                    '\n(' + mDate.format('DD/MM/YY') + ' - ' + moment(mDate).add(6, 'days').format('DD/MM/YY') + ')';

                //e.g. W3 of Sep 2018 (20th-6th)
                this.timeframeString =
                    'W' + weekNumber + ' of ' + mDate.format('MMM') + ' ' + mDate.format('YYYY') +
                    ' (' + mDate.format('Do') + '-' + moment(mDate).add(6, 'days').format('Do') + ')';

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
    }
    
    public getWeekDisplayString(weekCommencingDate : Date, length : StringLengthType) {
        var result: string = '',
            mDate: moment.Moment = moment(weekCommencingDate),
            weekNumber : number = this.getWeekNumberOfMonth(weekCommencingDate);
        switch (length) {
            case StringLengthType.Short:
                //Sep W3 2018 (20th-6th)
                result =
                    mDate.format('MMM') + ' Week ' + weekNumber + ' ' + mDate.format('YYYY') +
                    ' (' + mDate.format('Do') + '-' + moment(mDate).add(6, 'days').format('Do') + ')';
                break;
            case StringLengthType.Long:
                //3rd Week of April (20/8/16 - 26/8/16)
                result =
                    weekNumber + this.ordinalString(weekNumber) +
                    ' week of ' + mDate.format('MMMM YYYY') + 
                    '\n(' + mDate.format('DD/MM/YY') + ' - ' + moment(mDate).add(6,'days').format('DD/MM/YY') + ')';
                break;
        }
        return result;
    }

    public getWeekNumberOfMonth( weekComencingDate : Date) {
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

    public getWeeksInMonth() {
        var weeks = new Array<IWeek>();
        var mDate: moment.Moment = moment(new Date(this.year, this.month, 1)).startOf('isoWeek'),
            weekNumber:  number = 1,
            loopCounter: number = 0;
        while (mDate.month() <= this.month || loopCounter > 10) {
            loopCounter++; //Prevent infinite loop
            if (mDate.month() === this.month) {
                weeks.push(
                    {
                        wcDate: mDate.toDate(),
                        toString:
                            weekNumber + this.ordinalString(weekNumber) + ' week (' +
                            mDate.format('Do') + '-' + moment(mDate).add(6,'days').format('Do') + ')'
                    });
                weekNumber++;
            }
            mDate.add(1, 'week');
        }
        this.weeks = weeks;
    }

    private ordinalString(n : number) {
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
