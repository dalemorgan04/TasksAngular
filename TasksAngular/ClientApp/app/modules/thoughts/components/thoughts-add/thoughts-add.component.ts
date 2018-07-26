import { Component } from '@angular/core';
import { query, stagger, trigger, state, style, transition, animate } from '@angular/animations';
import { ThoughtsService } from '../../thoughts.service';

@Component({
    selector: 'thoughts-add',
    templateUrl: './thoughts-add.component.html',
    styleUrls: ['./thoughts-add.component.scss']
})
export class ThoughtsAddComponent {

    public thought : IThought;
    

    constructor(
        private thoughtsService: ThoughtsService)
    {
        
    }

    addThought() {
        this.thoughtsService.addThought(this.thought)
            .subscribe(result => {
                if (result) {
                    alert("success!");
                }
            }, error => alert('Couldnt get list'));
    }
}
