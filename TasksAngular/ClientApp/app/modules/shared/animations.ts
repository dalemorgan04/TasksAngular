import { query, stagger, trigger, state, style, transition, animate } from '@angular/animations';

export const headerLeftArrow =
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
        ]);

export const headerRightArrow = 
    trigger('rightArrow',
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
        ]);

export const navbar =
    trigger('navbar',
        [
            state('expanded',
                style({
                    width: '150px'
                })),
            state('minified',
                style({
                    width: '70px'
                })),
            transition('expanded => minified',
                [
                    query('span',
                        stagger('30ms',
                            [
                                animate('100ms', style({ opacity: '0' }))
                            ])),
                    query(':self', animate('200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
                ]),
            transition('minified => expanded',
                [
                    query('span', style({ opacity: 0 })),
                    query(':self', animate('200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')),
                    query('span',
                        stagger('30ms',
                            [
                                animate('100ms', style({ opacity: '1' }))
                            ]))
                ])
        ]);
export const sidebar =
    trigger('sidebar',
        [
            state('expanded',
                style({
                    width: '350px'
                })),
            state('minified',
                style({
                    width: '0px'
                })),
            transition('expanded => minified',
                [
                    query('.content', animate('100ms', style({ opacity: '0' }))),
                    query(':self', animate('200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
                ]),
            transition('minified => expanded',
                [
                    query('.content', style({ opacity: 1 })),
                    query(':self', animate('200ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')),
                    query('.content', animate('100ms', style({ opacity: '1' })))
                ])
        ]);
