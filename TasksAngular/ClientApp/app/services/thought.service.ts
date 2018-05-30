import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import './thought.IThought';
import './thought.IThoughts';

@Injectable()
export class ThoughtService
{
    baseUrl: string = "";
    public thoughtsList: IThought[];

    constructor(
        private http: Http,
        @Inject('BASE_URL') baseUrl: string) {
            this.baseUrl = baseUrl;
    }

    getThoughtList(): Observable<boolean> {
        return this.http.get('api/Thoughts/Index')
            .map(response => {
                //this.thoughtsList = response.json();
                let thought: IThought[];
                return true;
            })
            .catch(this.errorHandler);
    }

    getTest(): Observable<string> {
        return this.http.get('api/Thoughts/GetTest')
            .map(response => response.text());
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}