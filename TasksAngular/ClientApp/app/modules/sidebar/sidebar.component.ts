import { Component, OnInit, HostBinding } from '@angular/core';
import { sidebar, fadeIn } from '../shared/animations';
import { SidebarService } from './sidebar.service';
import { SidebarTab } from '../../models/sidebar.model';
import { TimeframeType } from '../../models/timeframe.model';


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [ sidebar , fadeIn ]
})
export class SidebarComponent implements OnInit {

    public sidebarState: string = 'expanded';
    @HostBinding('class.minified') hostMinifiedClass: boolean;

    //Tabs
    public activeTab: TimeframeType;
    public availableTabs: SidebarTab[] = [SidebarTab.thoughtsAdd];
    public thoughtsEditIsHidden: boolean = false;
    public thoughtsAddIsHidden: boolean = false;

    constructor(private sidebarService: SidebarService) { }

    ngOnInit() {
        this.sidebarService.getIsOpen().subscribe(
            (isOpen: boolean) => {
                this.hostMinifiedClass = !isOpen;
                this.sidebarState = isOpen ? 'expanded' : 'minified';
        });
        this.sidebarService.getAvailableTabs().subscribe(
            (availableTabs: SidebarTab[]) => {
                this.availableTabs = availableTabs;
            });

        this.activeTab = TimeframeType.Date;
    }

    public openEditTab(): void {
        //this.sidebarService.switchTab(SidebarTab.thoughtsEdit);
    }

    public openAddTab(): void {
        //this.sidebarService.switchTab(SidebarTab.thoughtsAdd);
    }
}
