import { Component, NgZone, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavService } from '../nav/nav.service';
import { SidebarService } from '../../../shared/sidebar/sidebar.service';
import { headerLeftArrow, headerRightArrow } from '../../../shared/animations';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [ headerLeftArrow, headerRightArrow ]
})
export class HeaderComponent {

    public leftIcon = faChevronLeft;
    public leftArrowState: string = 'expanded';

    public rightIcon = faChevronRight;
    public rightArrowState: string = 'minified';

    public isNavMinified: boolean = false;
    public isSidebarOpen: boolean = false;

    constructor(
        public zone: NgZone,
        private navService: NavService,
        private sidebarService: SidebarService)
    { }

    ngOnInit() {
        this.navService.change.subscribe((isMinified: any) => {
            this.isNavMinified = isMinified;
            this.leftArrowState = this.isNavMinified
                ? 'minified'
                : 'expanded';
        });
        this.sidebarService.change.subscribe((isOpen: any) => {
            this.isSidebarOpen = isOpen;
            this.rightArrowState = this.isSidebarOpen
                ? 'expanded'
                : 'minified';
        });
    }

    toggleNav() {
        this.navService.toggle();
    }

    toggleSidebar() {
        this.sidebarService.toggle();
    }
}