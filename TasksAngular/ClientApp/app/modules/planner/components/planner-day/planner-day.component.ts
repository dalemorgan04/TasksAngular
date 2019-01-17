import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IThought } from '../../../../models/thought.model';
import { ThoughtsService } from '../../../thoughts/thoughts.service';
import { IPlannerItem } from '../../../../models/planner.model';

@Component({
    selector: 'thoughts-list',
    templateUrl: './thoughts-list.component.html',
    styleUrls: ['thoughts-list.component.scss']
})

export class PlannerDayComponent implements OnInit {    

    public plannerItemList: IPlannerItem[];

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
