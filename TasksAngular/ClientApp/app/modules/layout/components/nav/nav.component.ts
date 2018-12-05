import { Component, OnInit, HostBinding } from '@angular/core';
import { NavService } from './nav.service';
import { faProjectDiagram, faLightbulb, faTasks, faRetweet, faCalendarAlt, faFolderOpen   } from '@fortawesome/free-solid-svg-icons';
import { navbar } from '../../../shared/animations';

@Component({
    selector: 'nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    animations: [ navbar ]
})
export class NavComponent implements OnInit {

    public navbarState: string; 
    @HostBinding('class.minified') hostMinifiedClass: boolean;

    public planIcon = faProjectDiagram;
    public thoughtsIcon = faLightbulb;
    public tasksIcon = faTasks;
    public habitsIcon = faRetweet;
    public eventsIcon = faCalendarAlt;
    public projectsIcon = faFolderOpen;

    constructor(private navService: NavService) {}

    ngOnInit() {
        this.navService.getIsMinified().subscribe(
            (isMinified: any) => {
                this.hostMinifiedClass = isMinified;
                this.navbarState = isMinified
                    ? 'minified'
                    : 'expanded';
            }
        );
    }
}
