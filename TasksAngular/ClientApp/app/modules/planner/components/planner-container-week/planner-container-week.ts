import { Component, OnInit, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { IPlannerItem } from '../../../../models/planner.model';
import { PlannerService } from '../../planner.service';

@Component({
    selector: 'planner-container-week',
    templateUrl: './planner-container-week.component.html',
    styleUrls: ['planner-container-week.component.scss']
})

export class PlannerContainerWeekComponent {
    
    @Input() public dateTime: Date;
    public days: Date[];
    public plannerItemList: IPlannerItem[];

    constructor(
        private plannerService: PlannerService,
        private dragula: DragulaService)
    { this.plannerService.getDate}

    ngOnInit() {

    }
/*
 * So the days will have a date input that is fixed, then it will pull from the service the items and filter them out
 * The week container will repeat the days of the week
 * The planner component will have the datetime as a variable and input the correct ones into the subcomponents
*/
}
