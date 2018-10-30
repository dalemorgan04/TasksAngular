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
    public description : string = '';

    private _timeframe: ITimeframe;//Local instance
    public $timeframe: Subject<ITimeframe>; //Comp Input
    public timeframeComponentOutput: ITimeframe;//Comp Output

    public selectedThought: IEditThought;
    
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
        var defaultTimeframe: ITimeframe = {
            dateTime: new Date(),
            timeframeType: TimeframeType.Open
        }
        this.$timeframe.next(defaultTimeframe);
        this.resetAddTab();
    }

    public getTimeframe() {
        return this.$timeframe.asObservable(); //TODO fix this observable
    }

    private resetAddTab() : void {
        var defaultDate: Date = new Date();
        var defaultTimeframeType: TimeframeType = TimeframeType.Time;
        this._timeframe = { dateTime: defaultDate, timeframeType: defaultTimeframeType };
        this.description = '';
    }

    private selectThought(thought: IEditThought) {
        this.selectedThought = thought;
        this.description = this.selectedThought.description;
        this._timeframe = {
            dateTime: this.selectedThought.dateTime,
            timeframeType: this.selectedThought.timeframeType
        };
        this.$timeframe.next(this._timeframe);
    }

    private validateThought(): string {
        if (this.description === '') {
            return 'Add a description first';
        }
        if (!moment(this._timeframe.dateTime).isValid()) {
            return 'Correct the due date first';
        }
        return '';
    }
}
