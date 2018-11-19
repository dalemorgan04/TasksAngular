import { Component} from '@angular/core';
import { sidebar, fadeIn } from '../../shared/animations';

@Component({
    selector: 'planner',
    templateUrl: './planner.component.html',
    styleUrls: [
        '../../shared/sidebar/sidebar.scss',
        './planner.component.scss'
    ],
    animations: [sidebar, fadeIn ]
})
export class PlannerComponent {    
}
