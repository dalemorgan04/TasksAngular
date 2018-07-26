import { Component, NgZone, ViewChild } from '@angular/core';
import { SidebarService } from '../../shared/sidebar/sidebar.service';
import { MatDrawer } from '@angular/material/sidenav';
import { sidebar, fadeIn } from '../../shared/animations';

@Component({
    selector: 'thoughts',
    templateUrl: './thoughts.component.html',
    styleUrls: [
        '../../shared/sidebar/sidebar.scss',
        './thoughts.component.scss'
    ],
    animations: [sidebar, fadeIn ]
})
export class ThoughtsComponent {

    private isOpen: boolean = false;
    public sidebarState: string = 'expanded';
    public tab: string = 'add';
    public tabState: string = 'active';

    constructor(
        public zone: NgZone,
        private sidebarService: SidebarService) { }

    ngOnInit() {
        this.sidebarService.change.subscribe((isOpen: any) => {
            this.isOpen = isOpen;
            this.toggleSidebar();
        });
    }

    toggleSidebar() {
        this.sidebarState = this.sidebarState === 'expanded'
            ? 'minified'
            : 'expanded';
    }

    switchTab(tab: string) {
        
        if (this.tab !== tab) {
            this.tab = tab;
        }

        //this.tabState = this.tabState === 'active'
        //    ? 'inactive'
        //    : 'active';
    }
}
