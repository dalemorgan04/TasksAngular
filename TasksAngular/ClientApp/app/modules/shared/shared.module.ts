import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from './sidebar/sidebar.module';
import { MyDatePickerModule } from 'mydatepicker';
import { DayPickerComponent } from './datepicker/daypicker/daypicker.component';
import { WeekPickerComponent } from './datepicker/weekpicker/weekpicker.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        CommonModule,
        SidebarModule,
        MyDatePickerModule,
        FormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatSidenavModule,
        MatCardModule,
        MatTabsModule,
        MatExpansionModule,
        MatSelectModule,
        FlexLayoutModule
    ],
    declarations: [
        DayPickerComponent,
        WeekPickerComponent
    ],
    exports: [
        MyDatePickerModule,
        SidebarModule,
        DayPickerComponent,
        WeekPickerComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatSidenavModule,
        MatCardModule,
        MatTabsModule,
        MatExpansionModule,
        MatSelectModule,
        FlexLayoutModule
    ]
})
export class SharedModule {}
