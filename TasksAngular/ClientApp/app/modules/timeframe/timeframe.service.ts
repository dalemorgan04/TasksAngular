import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import '../../models/thought.model';

import { Subject } from 'rxjs';
import { ITimeframe } from '../../models/timeframe.model';

@Injectable()
export class TimeframeService {

    private _timeframe: ITimeframe;
    private $timeframe: Subject<ITimeframe> = new Subject<ITimeframe>();

    constructor() { }

    public getTimeframe(): Observable<ITimeframe> {
        return this.$timeframe.asObservable();
    }

    public updateTimeframe(timeframe: ITimeframe) {
        //this.$timeframe.next(timeframe);
    }    
}
