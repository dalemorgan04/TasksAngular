import { Component, OnInit } from '@angular/core';
import { ThoughtsService } from '../../thoughts.service';
import '../../../../models/timeframe.model';
import { ITimeframe, TimeframeType} from '../../../../models/timeframe.model';

@Component({
    selector: 'thoughts-add',
    templateUrl: './thoughts-add.component.html',
    styleUrls: ['./thoughts-add.component.scss']
})
export class ThoughtsAddComponent implements OnInit {

    public thought: IThought;
    public test: string;
    public timeframe : ITimeframe;

    constructor(private thoughtsService: ThoughtsService) { }
    ngOnInit() {
        this.test = "hello2";
        var defaultDate: Date = new Date();
        var defaultTimeframeType: TimeframeType = TimeframeType.Time;
        this.timeframe = { dateTime: defaultDate, timeframeType: defaultTimeframeType };
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
