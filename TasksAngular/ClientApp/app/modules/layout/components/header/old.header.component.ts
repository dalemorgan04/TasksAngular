import { Component, NgZone, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavService } from '../nav/nav.service';

@
Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [
        trigger('wobbleRight',
            [
                state('expanded',
                    style({
                        transform: 'rotate3d(0, 0, 1, 180deg)'
                    })),
                state('minified',
                    style({
                        transform: 'rotate3d(0, 0, 1, 180deg)'
                    })),
                transition('expanded => minified', animate(300)),
                transition('minified => expanded', animate(300)),
                transition('inactive => active',
                    animate(700,
                        keyframes([
                            style({ transform: 'rotate3d(0, 0, 1, 30deg)', offset: .15 }),
                            style({ transform: 'rotate3d(0, 0, 1, -35deg)', offset: .30 }),
                            style({ transform: 'rotate3d(0, 0, 1, 20deg)', offset: .45 }),
                            style({ transform: 'rotate3d(0, 0, 1, -10deg)', offset: .60 }),
                            style({ transform: 'rotate3d(0, 0, 1, 5deg)', offset: .75 }),
                            style({ transform: 'none', offset: 1 })
                        ])))
            ]),
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
                transition('expanded => expandedWobble',
                    animate(2000,
                        keyframes([
                            style({ transform: 'rotate3d(0, 0, 1,  30deg)', offset: .15 }),
                            style({ transform: 'rotate3d(0, 0, 1, -35deg)', offset: .30 }),
                            style({ transform: 'rotate3d(0, 0, 1,  20deg)', offset: .45 }),
                            style({ transform: 'rotate3d(0, 0, 1, -10deg)', offset: .60 }),
                            style({ transform: 'rotate3d(0, 0, 1,   5deg)', offset: .75 }),
                            style({ transform: 'none', offset: 1 })
                        ]))),
                
                transition('minified => minifiedWobble',
                    animate(2000,
                        keyframes([
                            style({ transform: 'rotate3d(0, 0, 1, 210deg)', offset: .15 }),
                            style({ transform: 'rotate3d(0, 0, 1, 145deg)', offset: .30 }),
                            style({ transform: 'rotate3d(0, 0, 1, 200deg)', offset: .45 }),
                            style({ transform: 'rotate3d(0, 0, 1, 170deg)', offset: .60 }),
                            style({ transform: 'rotate3d(0, 0, 1, 185deg)', offset: .75 }),
                            style({ transform: 'rotate3d(0, 0, 1, 180deg)', offset: 1 })
                        ]))),
                transition(
                    'minified => expanded,' +
                    'expanded => minified,' +
                    'expandedWobble => expanded,' +
                    'minifiedWobble => minified', animate(2000))
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
        if (this.leftArrowState === 'minifiedWobble') {
            this.leftArrowState = 'minified';
        } else if (this.leftArrowState === 'expandedWobble') {
            this.leftArrowState = 'expanded';
        }
        this.navService.toggle();
    }

    triggerWobble( side : string ) {
        switch (side) {
            case 'left':
                if (this.isMinified) {
                    this.leftArrowState = 'minifiedWobble';
                } else {
                    this.leftArrowState = 'expandedWobble';
                }
            break;
        case 'right':
            this.wobbleRightState = 'active';
            break;
        }
    }

    resetWobble(side: string) {
        switch (side) {
        case 'left':
            this.zone.run(() => {
                if (this.leftArrowState === 'minifiedWobble') {
                    this.leftArrowState = 'minified';
                } else if (this.leftArrowState === 'expandedWobble') {
                    this.leftArrowState = 'expanded';
                }
            });
            break;
        case 'right':
            this.zone.run(() => {
                this.wobbleRightState = 'inactive';
                });
            break;
        }
    }
    
}