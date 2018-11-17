import { Component} from '@angular/core';
import { SidebarService } from '../../shared/sidebar/sidebar.service';
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
    //TODO: Move sidebar as its own shared component
    constructor( private sidebarService: SidebarService )
    {}

    ngOnInit() {
    }
}
