import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import '../../models/thought.model';
import { IThought, IAddThought, IEditThought } from '../../models/thought.model';
import { Subject } from 'rxjs';
import { TimeframeType, ITimeframe } from '../../models/timeframe.model';
import { now } from 'moment';
import { TimeframeService } from '../timeframe/timeframe.service';
import { SidebarService } from '../sidebar/sidebar.service';
import { SidebarTab } from '../../models/sidebar.model';
import { IPlannerItem, PlannerItemType } from '../../models/planner.model';
import { ThoughtsService } from '../thoughts/thoughts.service';
import { forEach } from '@angular/router/src/utils/collection';
import { A11yModule } from '@angular/cdk/a11y';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class PlannerService {

    private plannerItemList: Subject<IPlannerItem[]> = new Subject<IPlannerItem[]>();        
    private selectedItem: Subject<IPlannerItem> = new Subject<IPlannerItem>();

    private thoughtslist: IThought[];

    constructor(
        private http: HttpClient,
        private sidebarService: SidebarService,
        private timeframeService: TimeframeService,
        private thoughtsService: ThoughtsService)
    {
        //Thoughts
        this.thoughtsService.getThoughtslist().subscribe(
            ( thoughtsList: IThought[] ) => {
                this.thoughtslist = thoughtsList;
                this.updatePlannerItemList();
            });
    }

    public getPlannerItemList() : Observable<IPlannerItem[]> {
        return this.plannerItemList.asObservable();
    }

    public refreshPlannerItemList() {
        this.thoughtsService.refreshThoughtslist();
    }

    private updatePlannerItemList() {
        //Thoughts
        var list: IPlannerItem[] = [];
        if (this.thoughtslist !== undefined) {
            this.thoughtslist.forEach((thought: IThought) => {
                var item: IPlannerItem = {
                    plannerItemType: PlannerItemType.thought,
                    id: thought.thoughtId,
                    description: thought.description,
                    timeFrameId: thought.timeFrameId,
                    dateTime: thought.dateTime
                };
                list.push(item);
            });
            this.plannerItemList.next(list);
        }

        //Order the items
    }

}
