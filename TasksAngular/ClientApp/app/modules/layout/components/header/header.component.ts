import { Component, NgZone } from '@angular/core';
import { NavService } from '../nav/nav.service';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { headerLeftArrow, headerRightArrow } from '../../../shared/animations';
import { SidebarService } from '../../../sidebar/sidebar.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
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


        this.navService.getIsMinified().subscribe(
            (isMinified: any) => {
                this.isNavMinified = isMinified;
                this.leftArrowState = this.isNavMinified
                    ? 'minified'
                    : 'expanded';
            }
        );
        this.sidebarService.getIsOpen().subscribe((isOpen: boolean) => {
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
