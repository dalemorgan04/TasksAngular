import { Component, NgZone } from '@angular/core';
import { query, trigger, state, style, transition, animate } from '@angular/animations';
import { sidebar } from '../../../shared/animations';
import { SidebarService } from '../../../shared/sidebar/sidebar.service';

@Component({
    selector: 'thoughts-sidebar',
    templateUrl: './thoughts-sidebar.component.html',
    styleUrls: [
        '../../../shared/styles/sidebar.css',
        './thoughts-sidebar.component.css'
    ],
    animations: [ sidebar ]
})
export class ThoughtsSideBarComponent {

    private isOpen: boolean = false;
    public sidebarState: string = 'minified';

    constructor(
        public zone: NgZone,        
        private sidebarService: SidebarService)
    { }

    ngOnInit() {
        this.sidebarService.change.subscribe((isOpen: any) => {
            this.isOpen = isOpen;
            this.sidebarState = this.isOpen
                ? 'expanded'
                : 'minified';
        });
    }
}