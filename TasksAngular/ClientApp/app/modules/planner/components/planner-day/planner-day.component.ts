import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IThought } from '../../../../models/thought.model';
import { ThoughtsService } from '../../../thoughts/thoughts.service';

@Component({
    selector: 'thoughts-list',
    templateUrl: './thoughts-list.component.html',
    styleUrls: ['thoughts-list.component.scss']
})

export class ThoughtsListComponent implements OnInit {    

    constructor(
        private thoughtsService: ThoughtsService,
        private dragula: DragulaService)
    {
        this.thoughtsService.getThoughtslist().subscribe(
            (thoughtsList) => {

            });
    }

    ngOnInit(): void {
        this.thoughtsService.refreshThoughtslist();
        
    }


}
