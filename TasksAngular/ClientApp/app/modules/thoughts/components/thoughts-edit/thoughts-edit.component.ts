import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThoughtsService } from '../../thoughts.service';
import { ITimeframe, TimeframeType} from '../../../../models/timeframe.model';
import { IAddThought, IThought, IEditThought } from '../../../../models/thought.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { TimeframeService } from '../../../timeframe/timeframe.service';

@Component({
    selector: 'thoughts-edit',
    templateUrl: './thoughts-edit.component.html',
    styleUrls: ['./thoughts-edit.component.scss']
})
export class ThoughtsEditComponent implements OnInit {
    public description : string = '';
    public timeframe: ITimeframe;
    public selectedThought: IEditThought;
    
    constructor(
        private thoughtsService: ThoughtsService,
        private timeframeService: TimeframeService)
    {
        this.thoughtsService.getSelectedThought().subscribe(
            (thought: IEditThought) => {
                this.selectedThought = thought;
                this.thoughtSelected();
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

    private thoughtSelected() {
        this.description = this.selectedThought.description;
        this.timeframe = {
            dateTime: this.selectedThought.dateTime,
            timeframeType: this.selectedThought.timeframeType
        };
        this.timeframeService.updateTimeframe(this.timeframe);
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
