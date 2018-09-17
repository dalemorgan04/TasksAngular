import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import '../../models/thought.model';
import { IThought, IAddThought, IEditThought } from '../../models/thought.model';
import { Subject } from 'rxjs';
import { TimeframeType } from '../../models/timeframe.model';
import { now } from 'moment';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class ThoughtsService
{
    private baseUrl: string = '';

    private thoughtslistSource: Subject<IThought[]>    = new Subject<IThought[]>();
    public thoughtslist$: Observable<IThought[]> = this.thoughtslistSource.asObservable();

    private thoughtSelectedSource: Subject<IEditThought> = new Subject<IEditThought>();
    public thoughtSelected$: Observable<IEditThought> = this.thoughtSelectedSource.asObservable();

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string)
    {
        this.baseUrl = baseUrl;
    }

    public updateThoughtslist() : void {
        this.http.get<IThought[]>('api/Thoughts/List')
            .pipe(
                map((data: any) => {
                    return data.thoughtsList;
                })
            )
            .subscribe(result => {
                this.thoughtslistSource.next(result);
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

    public selectThought(thoughtId: number): void {
        let params = new HttpParams().set('thoughtId', JSON.stringify(thoughtId));
        this.http.get<IEditThought>('api/Thoughts/GetEdit', { params })
            .pipe(
                map((data: IEditThought) => {
                    return data;
                })
            )
            .subscribe((result: IEditThought) => {
                this.thoughtSelectedSource.next(result);
            });
    }

    public deselectThought(): void {
        let thought : IEditThought = {
            description: '',
            timeframeType: TimeframeType.Open,
            dateTime: new Date()
        }
        this.thoughtSelectedSource.next(thought);
    }

    private errorHandler(error: Response | any) {
        console.log(error.message || error);
        return Observable.throw(error.status);
    }
}
