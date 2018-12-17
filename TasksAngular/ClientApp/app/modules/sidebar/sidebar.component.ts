import { Component, OnInit, HostBinding } from '@angular/core';
import { sidebar } from '../shared/animations';
import { SidebarService } from './sidebar.service';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [ sidebar ]
})
export class SidebarComponent implements OnInit {

    public sidebarState: string; 
    @HostBinding('class.minified') hostMinifiedClass: boolean;

    constructor(private sidebarService: SidebarService) { }

    ngOnInit() {
        this.sidebarService.getIsOpen().subscribe(
            (isOpen: boolean) => {
                this.hostMinifiedClass = isOpen;
                this.sidebarState = isOpen
                    ? 'minified'
                    : 'expanded';
            }
        );
    }
}
