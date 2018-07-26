import { Component, OnInit, ViewChild, Input } from '@angular/core';

import '../../../models/timeframe.model';
import { MatTab, MatTabChangeEvent } from '@angular/material';


export interface Month {
    value: number;
    viewValue: string;
}
export interface Year {
    value: number;
}

@Component({
    selector: 'timeframe',
    templateUrl: './timeframe.component.html',
    styleUrls: ['./timeframe.component.scss']
})
export class TimeframeComponent implements OnInit{

    @Input() initialTimeframe: Timeframe;

    public timeframe : Timeframe;
    public hasTime: boolean = false;
    public tab: string;
    private matTab: MatTab;


    public months: Month[] = [
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
        { value: 12, viewValue: 'December' },
    ];

    public years: Year[] = [
        { value: 2018 },
        { value: 2019 },
        { value: 2020 },
        { value: 2021 },
        { value: 2022 },
        { value: 2023 }
    ];

    ngOnInit(): void {
    }

    tabChanged( event : MatTabChangeEvent) {
        this.matTab = event.tab;
    }

    getTimeframe() {

    }
}
