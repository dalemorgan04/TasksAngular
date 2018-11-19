import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class NavService {

    private $isMinified: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( window.innerWidth <= 768 );

    @Output() change: EventEmitter<boolean> = new EventEmitter();

    public getIsMinified() : Observable<boolean> {
        return this.$isMinified.asObservable();
    }
    public toggle(): void {
        this.$isMinified.next(!this.$isMinified.getValue());
    }    
    public setMinified( isMinified : boolean): void {
        this.$isMinified.next(isMinified);
    }
}
