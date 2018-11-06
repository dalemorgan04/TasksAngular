import { Component, NgZone} from '@angular/core';
import { SidebarService } from '../../shared/sidebar/sidebar.service';
import { sidebar, fadeIn } from '../../shared/animations';
import { ThoughtsService } from '../thoughts.service';

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
        private sidebarService: SidebarService,
        private thoughtService: ThoughtsService
    ) { }

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
            this.sidebarService.open();
        }

    }

    openEditTab() {
        this.thoughtService.deselectThought();
        if (this.tab !== 'edit') {
            this.sidebarService.switchTab('edit');
            this.sidebarService.open();
        }
    }
}
