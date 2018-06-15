import { Component } from '@angular/core';
import { query, stagger, trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'thoughtsSidebarAdd',
    templateUrl: './thoughtsSidebarAdd.component.html',
    styleUrls: ['./thoughtsSidebarAdd.component.css'],
    animations: [
        trigger('sidebar', [
            state('expanded', style({
                width: '350px'
            })),
            state('minified', style({
                width: '0px'
            })),
            transition('expanded => minified', [
                query('.container', animate('100ms', style({ opacity: '0' }))),
                query(':self', animate('200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
            ]),
            transition('minified => expanded', [
                query('.container', style({ opacity: 0 })),
                query(':self', animate('200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')),
                query('.container', animate('100ms', style({ opacity: '1' })))
            ])
        ])
    ]
})
export class ThoughtsSideBarAddComponent {

}