import { Component, OnInit, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IThought } from '../../../../models/thought.model';
import { ThoughtsService } from '../../../thoughts/thoughts.service';
import { IPlannerItem } from '../../../../models/planner.model';
import { PlannerService } from '../../planner.service';
import { forEach } from '@angular/router/src/utils/collection';
import { TimeframeType } from '../../../../models/timeframe.model';
import * as moment from 'moment';

@Component({
    selector: 'planner-week',
    templateUrl: './planner-week.component.html',
    styleUrls: ['planner-week.component.scss']
})

export class PlannerWeekComponent {

    @Input() public dateTime: Date;
    private title: string;

    public plannerItemList: IPlannerItem[];

    constructor(
        private plannerService: PlannerService,
        private dragula: DragulaService)
    {
        this.plannerService.getPlannerItemList().subscribe(
            (plannerItemList: IPlannerItem[]) => {
                this.plannerItemList = plannerItemList.filter(item => item.timeFrameId == TimeframeType.Week);
        });
    }

    ngOnInit() {
        this.title = moment(this.dateTime).format("Do");
    }
}
