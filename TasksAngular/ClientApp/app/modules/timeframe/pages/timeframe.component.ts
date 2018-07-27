import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTab, MatTabChangeEvent } from '@angular/material';
import { ITimeframe, TimeframeType, IMonth, IYear, months, years } from '../../../models/timeframe.model';

@Component({
    selector: 'timeframe',
    templateUrl: './timeframe.component.html',
    styleUrls: ['./timeframe.component.scss']
})
export class TimeframeComponent implements OnInit{

    @Input() timeframe: ITimeframe;
    @Output() timeframeChange = new EventEmitter<ITimeframe>();
    private timeframeString : string;

    private matTab: MatTab;
    public tabIndex: number;
    public months: IMonth[] = months;
    public years: IYear[] = years;

    public date: Date;
    public hasTime: boolean = false;
    public time: number;
    public weekNumber: number;
    public month: number;
    public year: number;

    ngOnInit(): void {
        //Set all to defaults
        this.date = new Date(); //now
        this.time = this.date.getTime();
        this.hasTime = false;
        this.weekNumber = 1;
        this.month = 0;
        //Initialise from input
        switch (this.timeframe.timeframeType) {
            case TimeframeType.Open:
                this.tabIndex = 0;
                break;
            case TimeframeType.Date:
                this.tabIndex = 1;
                this.date = this.timeframe.dateTime;
                break;
            case TimeframeType.Time:
                this.tabIndex = 1;
                this.date = this.timeframe.dateTime;
                this.hasTime = true;
                this.time = this.timeframe.dateTime.getTime();
                break;
            case TimeframeType.Week:
                this.weekNumber = 2;
                //this.month = this.timeframe.dateTime.getMonth();
                //this.year = this.timeframe.dateTime.getFullYear();
                this.tabIndex = 2;
                break;
            case TimeframeType.Month:
                this.tabIndex = 3;
                //this.month = this.timeframe.dateTime.getMonth();
                //this.year = this.timeframe.dateTime.getFullYear();
                break;
        default:
        }
    }

    updateTimeframe() {
        switch (this.matTab.textLabel) {
            case "Anytime":
                this.timeframe.timeframeType = TimeframeType.Open;
                this.timeframeString = "Anytime";
                break;
            case "Day":
                if (this.hasTime) {
                    this.timeframe.timeframeType = TimeframeType.Time;
                    this.timeframeString = "Time";
                } else {
                    this.timeframe.timeframeType = TimeframeType.Date;
                    this.timeframe.dateTime.toDateString();
                    this.timeframeString = "Day";
                }
                break;
            case "Week":
                this.timeframe.timeframeType = TimeframeType.Week;
                this.timeframeString = "Week";
                break;
            case "Month":
                this.timeframe.timeframeType = TimeframeType.Month;
                this.timeframeString = "Month";
                break;
        default:
        }
    }

    tabChanged(event: MatTabChangeEvent) {
        this.matTab = event.tab;
        this.updateTimeframe();
    }
}
