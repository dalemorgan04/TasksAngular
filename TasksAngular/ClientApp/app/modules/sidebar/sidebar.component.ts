import { Component, OnInit, HostBinding } from '@angular/core';
import { sidebar } from '../shared/animations';
import { SidebarService } from './sidebar.service';
import { SidebarTab } from '../../models/sidebar.model';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [ sidebar ]
})
export class SidebarComponent implements OnInit {

    public sidebarState: string = 'expanded';
    @HostBinding('class.minified') hostMinifiedClass: boolean;

    public availableTabs: SidebarTab[] = [SidebarTab.thoughtsAdd];

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
    }
}
