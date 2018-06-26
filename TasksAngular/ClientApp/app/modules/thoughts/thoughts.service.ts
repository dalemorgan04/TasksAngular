import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import '../../models/thought.model';

@Injectable()
export class ThoughtsService
{
    private baseUrl: string = '';
    private headers: Headers;
    private options: RequestOptions;
    public thoughtslist: IThought[];

    constructor(
        private http: Http,
        @Inject('BASE_URL') baseUrl: string)
    {
        this.baseUrl = baseUrl;
        this.thoughtslist = [];
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    public getThoughtsList(): Observable<IThought[]> {
        return this.http.get('api/Thoughts/Index')
            .map((response: Response) => {
                return response.json().thoughtsList; 
            });
    }

    public updateSortOrder(id: number, moveToSortId: number) : Observable<boolean> {        
        let data : string = JSON.stringify({ Id: id, MoveToSortId: moveToSortId});
        return this.http.post('api/Thoughts/Sort', data, this.options)
            .map((response: Response) => {
                return response.json();
            });
    }

    private errorHandler(error: Response | any) {
        console.log(error.message || error);
        return Observable.throw(error.status);
    }
}