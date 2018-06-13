import { Component, OnInit, HostBinding } from '@angular/core';
import { query, stagger, trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NavService } from './nav.service';

@Component({
    selector: 'nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    animations: [
        trigger('navbar', [
            state('expanded', style({
                width: '150px'
            })),
            state('minified', style({
                width: '70px'
            })),
            transition('expanded => minified', [
                query('span', stagger('30ms', [
                    animate('100ms', style({ opacity: '0' }))
                ])),
                query(':self', animate('200ms ease-in-out'))
            ]),
            transition('minified => expanded', [
                query('span', style({opacity:0})),
                query(':self', animate('200ms ease-in-out')),
                query('span', stagger('30ms', [
                    animate('100ms', style({ opacity: '1' }))
                ]))
            ])
        ])
    ]
})
export class NavComponent implements OnInit {

    public navbarState: string = 'expanded';
    public minifiedClass: boolean = true;
    private isMinified: boolean = false;

    constructor( private navService: NavService )
    { }

    ngOnInit() {
        this.navService.change.subscribe((isMinified: any) => {
            this.isMinified = isMinified;
            this.toggle();
        });
    }

    toggle() {
        if (!this.isMinified) {
            this.minifiedClass = this.isMinified;
        }
        this.navbarState = this.isMinified
            ? 'minified'
            : 'expanded';
    }

    toggleDone() {
        this.minifiedClass = this.isMinified;
    }
}