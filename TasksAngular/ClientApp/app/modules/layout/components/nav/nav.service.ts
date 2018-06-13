import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class NavService {

    public isMinified : boolean = false;

    @Output() change: EventEmitter<boolean> = new EventEmitter();

    toggle() {
        this.isMinified = !this.isMinified;
        this.change.emit(this.isMinified);
    }
}