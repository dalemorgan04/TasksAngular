import { Injectable, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import '../../models/thought.model';

@Injectable()
export class ThoughtsService
{
    private baseUrl: string = '';
    public thoughtslist: IThought[];

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') baseUrl: string)
    {
        this.baseUrl = baseUrl;
        this.thoughtslist = [];
    }

    public getThoughtsList(): Observable<IThought[]> {
        return this.http.get<IThought>('api/Thoughts/Index')
            .pipe(
                map( (data : any ) => {
                    return data.thoughtsList; 
                })
            );
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

    private errorHandler(error: Response | any) {
        console.log(error.message || error);
        return Observable.throw(error.status);
    }
}