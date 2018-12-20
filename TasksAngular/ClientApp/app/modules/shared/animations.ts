import { query, stagger, trigger, state, style, transition, animate, group } from '@angular/animations';

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
            transition('minified => expanded', animate(200)),
            transition('expanded => minified', animate(200))
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
            transition('minified => expanded', animate(200)),
            transition('expanded => minified', animate(200))
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
                    width: '45px'
                })),
            transition('expanded => minified', [
                group([
                    query('span', animate('300ms', style({ opacity: '0' }))),
                    query(':self', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
                ])
            ]),
            transition('minified => expanded', [
                group([
                    query('span', style({ opacity: '0' })),
                    query(':self', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                    query('span', animate('300ms', style({ opacity: '1' })))
                ])
            ])
        ]);

export const sidebar =
    trigger('sidebar',
        [
            state('expanded',
                style({
                    width: '300px'
                })),
            state('minified',
                style({
                    width: '35px'
                })),
            transition('expanded => minified',
                [
                    group([
                        query('.tab', animate('300ms', style({ opacity: '0' })), { optional: true}),
                        query(':self', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'), { optional: true})
                    ])
                ]),
            transition('minified => expanded',
                [
                    group([
                        query('.tab', animate('300ms', style({ opacity: '1' })), { optional: true }),
                        query(':self', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)'), { optional: true })
                    ])
                ])
        ]);
export const fadeIn =
    trigger('fadeIn',
        [
            state('fadeIn',
                style({
                    opacity: '1',
                    transform: 'translateY(50%)'
                })),
            transition('void => *', [style({ opacity: '0' }), animate('500ms')])
        ]);

export const timeframetab =
    trigger('tab',
        [
            state('active',
                style({
                    width: '350px'
                })),
            state('inactive',
                style({
                    width: '0px'
                })),
            transition('inactive => active',
                [
                    //query('.content', animate('100ms', style({ opacity: '0' }))),
                    query(':self', animate('200ms 200ms cubic-bezier(0.455, 0.03, 0.515, 0.955)'))
                ]),
            transition('active => inactive',
                [
                    query('.content', style({ opacity: 0 })),
                    query(':self', animate('200ms 100ms cubic-bezier(0.455, 0.03, 0.515, 0.955)')),
                    query('.content', animate('100ms', style({ opacity: '1' })))
                ])
        ]);
