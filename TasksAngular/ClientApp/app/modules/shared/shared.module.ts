import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar/sidebar.service';
import { MyDatePickerModule } from 'mydatepicker';
import { DayPickerComponent } from './datepicker/daypicker/daypicker.component';

@NgModule({
    imports: [
        CommonModule,
        MyDatePickerModule
    ],
    declarations: [
        DayPickerComponent
    ],
    providers: [
        SidebarService
    ],
    
    exports: [
        MyDatePickerModule,
        DayPickerComponent
    ]
})
export class SharedModule {}