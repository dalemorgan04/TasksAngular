import { Component} from '@angular/core';
import { sidebar, fadeIn } from '../shared/animations';

@Component({
    selector: 'planner',
    templateUrl: './planner.component.html',
    styleUrls: ['./planner.component.scss'],
    animations: [sidebar, fadeIn ]
})
export class PlannerComponent {
    public dateTime: Date = new Date();
}
