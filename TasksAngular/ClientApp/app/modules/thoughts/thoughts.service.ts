import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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

    private thoughtSelected: Subject<IEditThought> = new Subject<IEditThought>();
    public thoughtSelected$: Observable<IEditThought> = this.thoughtSelected.asObservable();
    private thoughtIdSelected: number = 0;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string)
    {
        this.baseUrl = baseUrl;
    }

    public updateThoughtslist() : void {
        this.http.get<IThought[]>('api/Thoughts/Index')
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
        //let data: string = JSON.stringify({ "Description" : "test" });
        return this.http.post<boolean>('api/Thoughts/Add', data, httpOptions)
            .pipe(
                map((response: Response) => {
                    return response;
                })
            );
    }

    private getThought(thought: IThought): IThought {

    }

    public deselectThought(): void {
        let thought : IEditThought = {
            description: '',
            timeframeType: TimeframeType.Open,
            dateTime: new Date()
        }
        this.thoughtSelected.next(thought);
    }

    public selectThought(id: number): void {
        
    }

    private errorHandler(error: Response | any) {
        console.log(error.message || error);
        return Observable.throw(error.status);
    }
}
