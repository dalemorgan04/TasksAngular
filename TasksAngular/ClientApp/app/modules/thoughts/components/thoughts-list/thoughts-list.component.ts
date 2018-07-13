import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { IMyDpOptions } from 'mydatepicker';
import { ThoughtsService } from '../../thoughts.service';
import '../../../../models/thought.model';

@Component({
    selector: 'thoughts-list',
    templateUrl: './thoughts-list.component.html',
    styleUrls: ['thoughts-list.component.css']
})
export class ThoughtsListComponent implements OnInit {

    public thoughtslist: IThought[];

    constructor(
        private thoughtsService: ThoughtsService,
        private dragula: DragulaService)
    {
        this.thoughtslist = [];
        this.dragula.setOptions('bag-thoughts', { revertOnSpill: true });
    }
    ngOnInit(): void {
        this.getThoughtsList();
        this.dragula.drop.subscribe(
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
                            this.getThoughtsList();            
                        } else {
                            alert('Couldnt update sort order');
                        }
                });
            }
        );
    }

    private getThoughtsList(): void {
        this.thoughtsService.getThoughtsList()
            .subscribe(result => {
                this.thoughtslist = result;
                this.sortThoughtsList();
            }, error => alert('Couldnt get list'));
    }

    private sortThoughtsList(): void {
        this.thoughtslist.sort((a, b) =>
              a.sortId > b.sortId ?  1
            : a.sortId < b.sortId ? -1 
            : 0);
    }
}