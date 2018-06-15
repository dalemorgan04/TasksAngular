import { Component, OnInit } from '@angular/core';
import { ThoughtsService } from '../../thoughts.service';
import '../../../../models/thought.model';

@Component({
    selector: 'thoughts-list',
    templateUrl: './thoughts-list.component.html'
})
export class ThoughtsListComponent implements OnInit {
    public thoughtslist: IThought[];
    constructor(private thoughtsService: ThoughtsService) {
        this.thoughtslist = [];
    }
    ngOnInit(): void {
        this.thoughtsService
            .getThoughtsList()
            .subscribe( result => {
                    this.thoughtslist =  result;
                }
            );
    }
}