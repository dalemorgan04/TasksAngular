import { Component, OnInit } from '@angular/core';
import { ThoughtsService } from '../../thoughts.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { IThought } from '../../../../models/thought.model';
import { DragulaService } from 'ng2-dragula';

@Component({
    selector: 'thoughts-list',
    templateUrl: './thoughts-list.component.html',
    styleUrls: ['thoughts-list.component.scss']
})

export class ThoughtsListComponent implements OnInit {

    public thoughtslist: IThought[] = [];
    public displayedColumns: string[] = ['description','timeFrameDueString'];
    public deleteIcon = faTimes;
    public selectedThought: number; 

    constructor(
        private thoughtsService: ThoughtsService,
        private dragula: DragulaService)
    {
        this.thoughtsService.getThoughtslist().subscribe(
            thoughtslist => {
                this.thoughtslist = thoughtslist;
            }
        );
        this.thoughtsService.getSelectedThought().subscribe(
            selectedThought => {
                this.selectedThought = selectedThought.id;
            }
        );
        this.dragula.createGroup('bag-thoughts',
            {
                revertOnSpill: true,
                mirrorContainer: document.body
            }
        );
    }

    ngOnInit(): void {
        this.thoughtsService.refreshThoughtslist();
        this.dragula.drop('bag-thoughts').subscribe(
            (el: any) => {
                var moveToSortId: number;
                if (el[1].previousElementSibling !== null) {
                    moveToSortId = Number(el[1].previousSibling.dataset.sortid) + 1;
                } else {
                    moveToSortId = 0;
                }
                this.thoughtsService.updateSortOrder(Number(el[1].dataset.thoughtid), moveToSortId)
                    .subscribe(result => {
                        if (result) {
                            this.thoughtsService.refreshThoughtslist();
                        } else {
                            alert('Couldnt update sort order');
                        }
                });
            }
        );
    }

    private sortThoughtsList(): void {
        this.thoughtslist.sort((a, b) =>
              a.sortId > b.sortId ?  1
            : a.sortId < b.sortId ? -1 
            : 0 );
    }

    public selectThought(thoughtId: number): void {
        this.selectedThought = thoughtId;
        this.thoughtsService.selectThought(this.selectedThought);
    }

    public deselectThought(e: Event): void {
        this.selectedThought = 0;
        this.thoughtsService.deselectThought();
    }
}
