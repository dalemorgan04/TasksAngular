import { Component, OnInit } from '@angular/core';
import { ThoughtsService } from '../../thoughts.service';
import '../../../../models/thought.model';

@Component({
    selector: 'thoughtlist',
    templateUrl: './thoughtList.component.html'
})
export class ThoughtListComponent implements OnInit {
    public thoughtlist: IThought[];
    constructor(private thoughtService: ThoughtsService) {
        this.thoughtlist = [];
    }
    ngOnInit(): void {
        this.thoughtService
            .getThoughtList()
            .subscribe( result => {
                    this.thoughtlist =  result;
                }
            );
    }
}