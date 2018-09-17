import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThoughtsService } from '../../thoughts.service';
import { ITimeframe, TimeframeType} from '../../../../models/timeframe.model';
import { IAddThought, IThought, IEditThought } from '../../../../models/thought.model';
import * as moment from 'moment';

@Component({
    selector: 'thoughts-edit',
    templateUrl: './thoughts-edit.component.html',
    styleUrls: ['./thoughts-edit.component.scss']
})
export class ThoughtsEditComponent implements OnInit {
    public description : string = '';
    public timeframe: ITimeframe;
    public selectedThought: IEditThought;
    
    constructor(private thoughtsService: ThoughtsService) {
        this.thoughtsService.thoughtSelected$.subscribe(
            thought => {
                this.selectedThought = thought;
            }
        );
    }
    ngOnInit() {
        this.resetAddTab();
    }

    private resetAddTab() : void {
        var defaultDate: Date = new Date();
        var defaultTimeframeType: TimeframeType = TimeframeType.Time;
        this.timeframe = { dateTime: defaultDate, timeframeType: defaultTimeframeType };
        this.description = '';
    }

    public thoughtSelected() {

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
