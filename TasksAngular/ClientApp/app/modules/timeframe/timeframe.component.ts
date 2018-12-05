import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from '../shared/components/datepicker/customDateAdapter/customDateAdapter.component';
import * as moment from 'moment';
import { TimeframeType, IMonth, IWeek, months, years } from '../../models/timeframe.model';
import { fadeIn } from '../shared/animations';

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
    encapsulation: ViewEncapsulation.None,
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: datepickerFormats }
    ],
    animations: [fadeIn]
})

export class TimeframeComponent implements OnInit {

    tabs = ['First', 'Second', 'Third', 'Fourth'];

    @Input()  public dateTime: Date;
    @Output() public dateTimeChange: EventEmitter<Date> = new EventEmitter<Date>();

    @Input()  public timeframeType: TimeframeType;
    @Output() public timeframeTypeChange: EventEmitter<TimeframeType> = new EventEmitter<TimeframeType>();        

    private tabName: string;
    public tabSelected: number = 0;
    public tabState: string = ''

    private timeframeString: string;
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
        if (!this.dateTime) {
            this.dateTime = new Date();
        }
        if (!this.timeframeType) {
            this.timeframeType = TimeframeType.Open;
        }
        this.updateTimeframe();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.dateTime) {
            this.dateTime = changes.dateTime.currentValue;
        }
        if (changes.timeframeType) {
            this.timeframeType = changes.timeframeType.currentValue;
        }

        switch (this.timeframeType) {
            case TimeframeType.Time:
                this.hasTime = true;
                break;
            default:
                this.hasTime = false;
        }
        this.updateTimeframe();


        var switchToTab: number =  0;
        switch (this.timeframeType) {
            case TimeframeType.Open:
                switchToTab = 0;
                break;
            case TimeframeType.Date:
            case TimeframeType.Time:
                switchToTab = 1;
                break;
            case TimeframeType.Week:
                switchToTab = 2;
                break;
            case TimeframeType.Month:
                switchToTab = 3;
                break;
        }
        if (this.tabSelected != switchToTab) {
           this.tabSelected = switchToTab
        }
    }

    public onDayTabChange() {
        
        var mDateTime = moment(this.dateControl.value);
        var timeframeType: TimeframeType = TimeframeType.Date;
        var dateTime: Date = this.date;
        
        if (mDateTime.isValid()) {
        //Time
            if (this.hasTime) {
                if (moment(this.dateTime, "HH:mm").isValid()) {
            //Valid
                    dateTime = moment(mDateTime.format('DD/MM/YYYY') + ' ' + this.time, 'DD/MM/YYYY HH:mm').toDate()
                } else {
            //Invalid
                    this.timeframeString = "Choose a time";
                }
            } else {
        //Date
            //Valid
                dateTime = new Date(mDateTime.year(), mDateTime.month(), mDateTime.date());
            }
        } else {
            //Invalid
            this.timeframeString = "Choose a date";
        }
        this.updateTimeframe();
        this.timeframeTypeChange.emit(timeframeType)
        this.dateTimeChange.emit(dateTime)
    }

    public onWeekTabChange() {
        this.wcDate = moment(this.wcDate).startOf('isoWeek').toDate();
        this.updateTimeframe();
        this.dateTimeChange.emit(this.wcDate);
    }

    public onMonthTabChange() {
        var monthAsDate = new Date(this.year, this.month, 1);
        this.timeframeString = moment(monthAsDate).format('MMMM YYYY');
        this.updateTimeframe();
        this.dateTimeChange.emit(monthAsDate);
    }

    public onTabSwitched(event: MatTabChangeEvent) {
        ////this.tabSelected = event.index;
        //this.tabName = event.tab.textLabel;
        //var selectedTimeframeType : TimeframeType;
        //switch (this.tabName) {
        //    case "Anytime":
        //        selectedTimeframeType = TimeframeType.Open;
        //        break;
        //    case "Day":
        //        if (this.hasTime) {
        //            selectedTimeframeType = TimeframeType.Time;
        //        } else {
        //            selectedTimeframeType = TimeframeType.Date;
        //        }
        //        break;
        //    case "Week":
        //        selectedTimeframeType = TimeframeType.Week;
        //        break;
        //    case "Month":
        //        selectedTimeframeType = TimeframeType.Month;
        //        break;
        //    default: selectedTimeframeType = TimeframeType.Open;
        //}
        //this.timeframeType = selectedTimeframeType;
        //this.updateTimeframe();
        //this.timeframeTypeChange.emit(this.timeframeType);
    }

    private updateTimeframe(): void {
        //TODO: Check that only the other component properties are being updated to reflect 
        //Update all properties
        var mDateTime: moment.Moment = moment(this.dateTime);
        this.date = mDateTime.toDate();
        this.dateControl.setValue(this.date);
        this.time = mDateTime.format("HH:mm");
        this.hasTime = this.timeframeType === TimeframeType.Time;
        this.month = mDateTime.month();
        this.year = mDateTime.year();

        //Update timeframeString
        switch (this.timeframeType) {
            case TimeframeType.Open:
                this.timeframeString = "Anytime";
                break;
            case TimeframeType.Time:
                this.timeframeString = moment(this.date).format('Do MMM YYYY') + ' at ' + this.time;
                break;
            case TimeframeType.Date:
                this.timeframeString = moment(this.dateTime).format("Do MMM YYYY");
                break;
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
                break;
            case TimeframeType.Month:
                let monthAsDate = new Date(this.year, this.month, 1);
                this.timeframeString = moment(monthAsDate).format('MMMM YYYY');
                break;
            default:
                this.timeframeString = "";
        }
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
