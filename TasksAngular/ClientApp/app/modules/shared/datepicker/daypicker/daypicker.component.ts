import { Component } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { MyDatePicker } from 'mydatepicker';

@Component({
    selector: 'daypicker',
    templateUrl: './daypicker.component.html',
    styleUrls: ['./daypicker.component.css']
})
export class DayPickerComponent extends MyDatePicker {

    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };
    public model: any = {
        date: { year: 2018, month: 10, day: 9 }
    };
}