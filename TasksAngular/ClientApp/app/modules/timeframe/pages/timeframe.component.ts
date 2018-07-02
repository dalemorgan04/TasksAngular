import { Component } from '@angular/core';
import { query, stagger, trigger, state, style, transition, animate } from '@angular/animations';

import '../../../models/timeframe.model';

@Component({
    selector: 'timeframe',
    templateUrl: './timeframe.component.html',
    styleUrls: ['./timeframe.component.css']
})
export class TimeframeComponent {
    public tab: string = 'open';



    public switchTab(tab: string) {
        //TODO animations for content sliding in and underline
        this.tab = tab;
    }
}
