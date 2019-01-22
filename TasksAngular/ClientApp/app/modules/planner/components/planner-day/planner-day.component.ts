import { Component, OnInit, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IThought } from '../../../../models/thought.model';
import { ThoughtsService } from '../../../thoughts/thoughts.service';
import { IPlannerItem } from '../../../../models/planner.model';
import { PlannerService } from '../../planner.service';
import { forEach } from '@angular/router/src/utils/collection';
import { TimeframeType } from '../../../../models/timeframe.model';

@Component({
    selector: 'planner-day',
    templateUrl: './planner-day.component.html',
    styleUrls: ['planner-day.component.scss']
})

export class PlannerDayComponent implements OnInit {    

    @Input() public dateTime: Date;
    public plannerItemList: IPlannerItem[];

    constructor(
        private plannerService: PlannerService,
        private dragula: DragulaService)
    {
        this.plannerService.getPlannerItemList().subscribe(
            (plannerItemList: IPlannerItem[]) => {
                this.updatePlannerItemList( plannerItemList );
        });
    }

    ngOnInit(): void {
        this.plannerService.refreshPlannerItemList();
    }

    public updatePlannerItemList( items : IPlannerItem[]) : void {
        //Strip out anything not meant for today
        var currentItems: IPlannerItem[] = [] ;
        items.forEach( (item: IPlannerItem) => {
            if (item.timeFrameId == TimeframeType.Date && item.dateTime == this.dateTime) {
                currentItems.push(item);
            }
        });
        this.plannerItemList = currentItems;
    }
}
