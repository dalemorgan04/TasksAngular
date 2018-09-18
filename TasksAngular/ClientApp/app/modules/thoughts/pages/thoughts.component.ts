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

    public sidebarState: string = 'expanded';
    public tab: string = 'add';
    public tabState: string = 'active';

    constructor(
        public zone: NgZone,
        private sidebarService: SidebarService) { }

    ngOnInit() {
        this.sidebarService.isOpen$().subscribe((isOpen: boolean) => {            
            this.toggleSidebar(isOpen);
        });
        this.sidebarService.activeTabName$().subscribe((activeTabName: string) => {
            this.tab = activeTabName;
        });
    }

    toggleSidebar(isOpen: boolean) {
        if (isOpen) {
            this.sidebarState = 'expanded';
        } else {
            this.sidebarState = 'minified';
        }
    }

    openAddTab() {
        if (this.tab !== 'add') {
            this.sidebarService.switchTab('add');
        }

    }

    openEditTab() {
        if (this.tab !== 'edit') {
            this.sidebarService.switchTab('edit');
        }
    }
}
