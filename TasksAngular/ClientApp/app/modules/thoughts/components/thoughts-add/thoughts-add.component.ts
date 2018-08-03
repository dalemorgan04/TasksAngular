import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThoughtsService } from '../../thoughts.service';
import { ITimeframe, TimeframeType} from '../../../../models/timeframe.model';
import { IAddThought } from '../../../../models/thought.model';
import * as moment from 'moment';

@Component({
    selector: 'thoughts-add',
    templateUrl: './thoughts-add.component.html',
    styleUrls: ['./thoughts-add.component.scss']
})
export class ThoughtsAddComponent implements OnInit {
    public description : string = '';
    public timeframe: ITimeframe;
    
    constructor(private thoughtsService: ThoughtsService) { }
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
                        this.thoughtsService.updateThoughtslist();
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
