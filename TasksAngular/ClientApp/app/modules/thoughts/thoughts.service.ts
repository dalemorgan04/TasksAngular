import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
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
    public thoughtlist: IThought[];

    constructor(
            private http: Http,
            @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
        this.thoughtlist = [];
    }

    getThoughtList(): Observable<IThought[]> {
        return this.http.get('api/Thoughts/Index')  
            .map((response: Response) => {
                this.thoughtlist = response.json().thoughtList;
                return this.thoughtlist;
            })
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}