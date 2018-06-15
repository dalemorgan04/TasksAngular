import { Component, OnInit } from '@angular/core';
import { query, stagger, trigger, state, style, transition, animate } from '@angular/animations';
import { NavService } from './nav.service';
import { navbar } from '../../../shared/animations';

@Component({
    selector: 'nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    animations: [ navbar ]
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