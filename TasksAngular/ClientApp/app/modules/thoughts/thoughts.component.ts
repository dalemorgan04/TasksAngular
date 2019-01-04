import { Component} from '@angular/core';

import { sidebar, fadeIn } from '../shared/animations';
import { SidebarService } from '../sidebar/sidebar.service';
import { ThoughtsService } from './thoughts.service';
import { SidebarTab } from '../../models/sidebar.model';

@Component({
    selector: 'thoughts',
    templateUrl: './thoughts.component.html',
    styleUrls: ['./thoughts.component.scss'],
    animations: [sidebar, fadeIn ]
})
export class ThoughtsComponent {

    public sidebarState: string = 'expanded';
    public tab: SidebarTab = SidebarTab.thoughtsAdd;
    public tabState: string = 'active';
    
    constructor(
        private sidebarService: SidebarService,
        private thoughtService: ThoughtsService
    ) { }

    ngOnInit() {
        this.sidebarService.getIsOpen().subscribe((isOpen: boolean) => {
            this.toggleSidebar(isOpen);
        });
        this.sidebarService.getActiveTab().subscribe((activeTabName: SidebarTab ) => {
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
        
        if (this.tab !== SidebarTab.thoughtsAdd ) {
            this.sidebarService.switchTab( SidebarTab.thoughtsAdd );
            this.sidebarService.open();
        }

    }

    openEditTab() {
        this.thoughtService.deselectThought();
        if (this.tab !== SidebarTab.thoughtsEdit ) {
            this.sidebarService.switchTab( SidebarTab.thoughtsEdit );
            this.sidebarService.open();
        }
    }
}
