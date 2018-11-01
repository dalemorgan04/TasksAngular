import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThoughtsService } from '../../thoughts.service';
import { ITimeframe, TimeframeType} from '../../../../models/timeframe.model';
import { IAddThought, IThought, IEditThought } from '../../../../models/thought.model';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { TimeframeService } from '../../../timeframe/timeframe.service';

@Component({
    selector: 'thoughts-edit',
    templateUrl: './thoughts-edit.component.html',
    styleUrls: ['./thoughts-edit.component.scss']
})
export class ThoughtsEditComponent implements OnInit {
    public editThought: IEditThought;
    public timeframeType: TimeframeType;
    public dateTime: Date;
    public description : string = '';
    
    constructor(
        private thoughtsService: ThoughtsService)
    {
        this.thoughtsService.getSelectedThought().subscribe(
            (thought: IEditThought) => {
                this.selectThought(thought);
            }
        );
    }

    ngOnInit() {
        this.resetEditTab();
    }   

    private resetEditTab() : void {
        this.dateTime = new Date();
        this.timeframeType = TimeframeType.Open;
        this.description = '';
    }

    private selectThought(thought: IEditThought) {
        this.editThought = thought;
        this.description = this.editThought.description;
        this.dateTime = this.editThought.dateTime;
        this.timeframeType = this.editThought.timeframeType;
    }

    private validateThought(): string {
        if (this.description === '') {
            return 'Add a description first';
        }
        if (!moment(this.dateTime).isValid()) {
            return 'Correct the due date first';
        }
        return '';
    }
}
