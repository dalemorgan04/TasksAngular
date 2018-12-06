import { Component, OnInit, HostBinding } from '@angular/core';
import { sidebar } from '../shared/animations';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [ sidebar ]
})
export class SidebarComponent implements OnInit {

    public navbarState: string; 
    @HostBinding('class.minified') hostMinifiedClass: boolean;

    ngOnInit() {

    }
}
