import { Component, OnInit } from '@angular/core';
import { ThoughtService } from '../../services/thought.service';
import '../../services/thought.IThoughts';
import '../../services/thought.IThought';

@Component({
    selector: 'thought-list',
    templateUrl: './thoughtList.component.html'
})
export class ThoughtListComponent implements OnInit {
    public thoughts: IThought[];

    constructor(private thoughtService: ThoughtService) {
    }

    ngOnInit(): void {
        this.thoughtService
            //.getThoughtList()
            .getTest()
            .subscribe(result => {
                
            }
        );
    }
    
}