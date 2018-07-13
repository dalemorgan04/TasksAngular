import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar/sidebar.service';
import { MyDatePickerModule } from 'mydatepicker';
import { DayPickerComponent } from './datepicker/daypicker/daypicker.component';
import { WeekPickerComponent } from './datepicker/weekpicker/weekpicker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        MyDatePickerModule,
        NgbModule
    ],
    declarations: [
        DayPickerComponent,
        WeekPickerComponent
    ],
    providers: [
        SidebarService
    ],
    
    exports: [
        MyDatePickerModule,
        DayPickerComponent,
        WeekPickerComponent,
        NgbModule
    ]
})
export class SharedModule {}