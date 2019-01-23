import { Component} from '@angular/core';
import { sidebar, fadeIn } from '../shared/animations';
import { PlannerService } from './planner.service';
import { DragulaService } from 'ng2-dragula';

@Component({
    selector: 'planner',
    templateUrl: './planner.component.html',
    styleUrls: ['./planner.component.scss'],
    animations: [sidebar, fadeIn ]
})
export class PlannerComponent {
    public dateTime: Date = new Date();

    constructor( private plannerService: PlannerService) {}

    ngOnInit(): void {
        this.plannerService.refreshPlannerItemList();
    }
}
