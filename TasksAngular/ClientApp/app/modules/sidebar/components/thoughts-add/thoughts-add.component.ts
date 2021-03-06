import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { ITimeframe, TimeframeType } from '../../../../models/timeframe.model';
import { ThoughtsService } from '../../../thoughts/thoughts.service';
import { TimeframeService } from '../../../timeframe/timeframe.service';
import { IAddThought } from '../../../../models/thought.model';

@Component({
    selector: 'thoughts-add',
    templateUrl: './thoughts-add.component.html',
    styleUrls: ['./thoughts-add.component.scss']
})
export class SidebarThoughtsAddComponent implements OnInit {
    public description : string = '';
    public timeframe: ITimeframe;
    
    constructor(
        private thoughtsService: ThoughtsService,
        private timeframeService: TimeframeService)
    {}

    ngOnInit() {
        this.resetAddTab();
    }

    private resetAddTab() : void {
        var defaultDate: Date = new Date();
        var defaultTimeframeType: TimeframeType = TimeframeType.Time;
        this.timeframe = { dateTime: defaultDate, timeframeType: defaultTimeframeType };
        this.description = '';
    }

    public addThought() : void {
        var errorMessage = this.validateThought();
        if (errorMessage !== '') {
            alert(errorMessage);
        } else {
            var thought: IAddThought = {
                description: this.description,
                timeframeType: this.timeframe.timeframeType,
                dateTime: this.timeframe.dateTime
            }
            this.thoughtsService.addThought(thought)
                .subscribe(result => {
                    if (result) {
                        this.thoughtsService.refreshThoughtslist();
                        this.resetAddTab();
                    }
                });
        }
    }

    private validateThought(): string {
        if (this.description === '') {
            return 'Add a description first';
        }
        if (!moment(this.timeframe.dateTime).isValid()) {
            return 'Correct the due date first';
        }
        return '';
    }
}
