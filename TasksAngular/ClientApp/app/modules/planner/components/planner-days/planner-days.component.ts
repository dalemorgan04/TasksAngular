import { Component, OnInit, Input } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { IPlannerItem } from '../../../../models/planner.model';
import { PlannerService } from '../../planner.service';
import * as moment from 'moment';

@Component({
    selector: 'planner-days',
    templateUrl: './planner-days.component.html',
    styleUrls: ['planner-days.component.scss']
})

export class PlannerDaysComponent {
    
    @Input() public dateTime: Date;
    public days: Date[];
    public plannerItemList: IPlannerItem[];

    constructor(
        private plannerService: PlannerService,
        private dragula: DragulaService)
    {}

    ngOnInit() {
        this.populateDays();
    }

    private populateDays(): void {
        var days = [];
        var monday : Date = moment(this.dateTime).startOf('isoWeek').toDate();
        for (var i = 0; i <= 6; i++) {
            var day = moment(monday).add(i, 'days').toDate();
            days.push(day);
        }
        this.days = days;
    }

/*
 * So the days will have a date input that is fixed, then it will pull from the service the items and filter them out
 * The week container will repeat the days of the week
 * The planner component will have the datetime as a variable and input the correct ones into the subcomponents
*/
}
