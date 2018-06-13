import { Component, NgZone, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavService } from '../nav/nav.service';

@
Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [
        trigger('leftArrow',
        [
            state('expanded',
                style({
                    transform: 'none'
                })),
            state('minified',
                style({
                    transform: 'rotate3d(0, 0, 1, 180deg)'
                })),
            transition('minified => expanded', animate(100)),
            transition('expanded => minified', animate('100ms 300ms'))
        ])
    ]
})
export class HeaderComponent {

    public leftArrowState: string = 'expanded';
    public wobbleRightState: string = 'expanded';
    public isMinified: boolean = false;

    constructor(public zone: NgZone, private navService: NavService) { }

    ngOnInit() {
        this.navService.change.subscribe((isMinified: any) => {
            this.isMinified = isMinified;
            this.leftArrowState = this.isMinified
                ? 'minified'
                : 'expanded';
        });
    }

    toggleNav() {
        this.navService.toggle();
    }
}