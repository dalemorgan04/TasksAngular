import { Component, OnInit } from '@angular/core';
import { NavService } from './nav.service';
import { navbar } from '../../../shared/animations';
import { faProjectDiagram, faLightbulb, faTasks, faRetweet, faCalendarAlt, faFolderOpen   } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    animations: [ navbar ]
})
export class NavComponent implements OnInit {

    public planIcon = faProjectDiagram;
    public thoughtsIcon = faLightbulb;
    public tasksIcon = faTasks;
    public habitsIcon = faRetweet;
    public eventsIcon = faCalendarAlt;
    public projectsIcon = faFolderOpen;

    public navbarState: string = 'expanded';
    public minifiedClass: boolean = true;
    private isMinified: boolean = false;

    constructor(private navService: NavService) {
    }

    ngOnInit() {
        this.navService.change.subscribe((isMinified: any) => {
            this.isMinified = isMinified;
            this.toggle();
        });
    }

    toggle() {
        if (!this.isMinified) {
            this.minifiedClass = this.isMinified;
        }
        this.navbarState = this.isMinified
            ? 'minified'
            : 'expanded';
    }

    toggleDone() {
        this.minifiedClass = this.isMinified;
    }
}
