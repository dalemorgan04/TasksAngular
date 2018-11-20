import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarService {

    private isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private activeTabName: Subject<string> = new Subject<string>();

    isOpen$(): Observable<boolean> {
        return this.isOpen.asObservable();
    }

    activeTabName$(): Observable<string> {
        return this.activeTabName.asObservable();
    }

    toggle(): void {
        this.isOpen.next(!this.isOpen.getValue());
    }

    open(): void {
        this.isOpen.next(true);
    }

    close(): void {
        this.isOpen.next(false);
    }

    switchTab(tabName: string): void {
        this.activeTabName.next(tabName);
    }
}
