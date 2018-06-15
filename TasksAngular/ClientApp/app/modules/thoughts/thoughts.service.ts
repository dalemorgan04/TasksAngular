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
    public thoughtslist: IThought[];

    constructor(
            private http: Http,
            @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
        this.thoughtslist = [];
    }

    getThoughtsList(): Observable<IThought[]> {
        return this.http.get('api/Thoughts/Index')  
            .map((response: Response) => {
                this.thoughtslist = response.json().thoughtsList;
                return this.thoughtslist;
            })
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}