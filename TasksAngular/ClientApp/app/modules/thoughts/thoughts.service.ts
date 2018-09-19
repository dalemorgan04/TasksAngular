import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import '../../models/thought.model';
import { IThought, IAddThought, IEditThought } from '../../models/thought.model';
import { Subject } from 'rxjs';
import { TimeframeType } from '../../models/timeframe.model';
import { now } from 'moment';
import { SidebarService } from '../shared/sidebar/sidebar.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class ThoughtsService
{
    private thoughtslist: Subject<IThought[]>    = new Subject<IThought[]>();    
    private selectedThought: Subject<IEditThought> = new Subject<IEditThought>();
    
    constructor( private http: HttpClient, private sidebarService : SidebarService )
    {}

    public getThoughtslist(): Observable<IThought[]> {
        return this.thoughtslist.asObservable();
    }

    public refreshThoughtslist() : void {
        this.http.get<IThought[]>('api/Thoughts/List')
            .pipe(
                map((data: any) => {
                    return data.thoughtsList;
                })
            )
            .subscribe(result => {
                this.thoughtslist.next(result);
            });
    }

    public updateSortOrder(id: number, moveToSortId: number) : Observable<boolean> {        
        let data : string = JSON.stringify({ Id: id, MoveToSortId: moveToSortId});
        return this.http.post<boolean>('api/Thoughts/Sort', data)
            .pipe(
                map((response: Response) => {
                    return response.json();
                })
            );
    }

    public addThought( thought:IAddThought ) : Observable<boolean> {
        let data: string = JSON.stringify(thought);
        return this.http.post<boolean>('api/Thoughts/Add', data, httpOptions)
            .pipe(
                map((response: Response) => {
                    return response;
                })
            );
    }

    public getSelectedThought(): Observable<IEditThought> {
        return this.selectedThought.asObservable();
    }

    public selectThought(thoughtId: number): void {
        let params = new HttpParams().set('thoughtId', JSON.stringify(thoughtId));
        this.http.get<IEditThought>('api/Thoughts/GetEdit', { params })
            .pipe(
                map((data: IEditThought) => {
                    return data;
                })
            )
            .subscribe((result: IEditThought) => {
                this.selectedThought.next(result);
            });
        this.sidebarService.switchTab('edit');
        this.sidebarService.open();
    }

    public deselectThought(): void {
        let thought : IEditThought = {
            description: '',
            timeframeType: TimeframeType.Open,
            dateTime: new Date()
        }
        this.selectedThought.next(thought);
    }

    private errorHandler(error: Response | any) {
        console.log(error.message || error);
        return Observable.throw(error.status);
    }
}
