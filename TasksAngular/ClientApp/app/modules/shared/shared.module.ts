import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { DayPickerComponent } from './datepicker/daypicker/daypicker.component';
import { WeekPickerComponent } from './datepicker/weekpicker/weekpicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ClickOutsideModule } from 'ng-click-outside'; 
//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter } from '@angular/material';
import { CustomDateAdapter } from './datepicker/customDateAdapter/customDateAdapter.component';

@NgModule({
    imports: [
        CommonModule,
        MyDatePickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatRadioModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatSidenavModule,
        MatCardModule,
        MatTabsModule,
        MatExpansionModule,
        MatSelectModule,
        FlexLayoutModule,
        ClickOutsideModule
    ],
    declarations: [
        DayPickerComponent,
        WeekPickerComponent
    ],
    providers: [
        { provide: DateAdapter, useClass: CustomDateAdapter }
    ],
    exports: [
        MyDatePickerModule,
        DayPickerComponent,
        WeekPickerComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatSidenavModule,
        MatCardModule,
        MatTabsModule,
        MatExpansionModule,
        MatSelectModule,
        FlexLayoutModule,
        ClickOutsideModule
    ]
})
export class SharedModule {}
