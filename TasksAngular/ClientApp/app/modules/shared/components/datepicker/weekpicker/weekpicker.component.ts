import { Component, ViewEncapsulation } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';

@Component({
    selector: 'weekpicker',
    templateUrl: './weekpicker.component.html',
    styleUrls: ['./weekpicker.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class WeekPickerComponent {

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };
    public model: any = {
        date: { year: 2018, month: 10, day: 9 }
    };
}