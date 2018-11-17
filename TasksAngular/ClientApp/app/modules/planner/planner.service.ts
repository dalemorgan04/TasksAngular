import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import '../../models/thought.model';
import { IThought, IAddThought, IEditThought } from '../../models/thought.model';
import { Subject } from 'rxjs';
import { TimeframeType, ITimeframe } from '../../models/timeframe.model';
import { now } from 'moment';
import { SidebarService } from '../shared/sidebar/sidebar.service';
import { TimeframeService } from '../timeframe/timeframe.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class ThoughtsService
{
    constructor(
        private http: HttpClient,
        private sidebarService: SidebarService,
        private timeframeService: TimeframeService)
    {}
}
