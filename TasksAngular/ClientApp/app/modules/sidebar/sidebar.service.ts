import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { SidebarTab } from '../../models/sidebar.model';

@Injectable()
export class SidebarService {

    private isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private activeTab: Subject<SidebarTab> = new Subject<SidebarTab>();
    private availableTabs: Subject<SidebarTab[]> = new Subject<SidebarTab[]>();

    public getIsOpen(): Observable<boolean> { return this.isOpen.asObservable(); }
    public getActiveTab(): Observable<SidebarTab> { return this.activeTab.asObservable(); }
    public getAvailableTabs(): Observable<SidebarTab[]> { return this.availableTabs.asObservable(); }

    public toggle(): void {
        this.isOpen.next(!this.isOpen.getValue());
    }

    public open(): void {
        this.isOpen.next(true);
    }

    public close(): void {
        this.isOpen.next(false);
    }

    public switchTab(tabName: SidebarTab): void {
        this.activeTab.next(tabName);
    }

    public setAvailableTabs( tabList: SidebarTab[]): void {
        this.availableTabs.next(tabList);
    }
}
