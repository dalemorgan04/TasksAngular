import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PlannerComponent } from './planner.component';
import { TimeframeModule } from '../timeframe/timeframe.module';
import { PlannerService } from './planner.service';
import { PlannerDayComponent } from './components/planner-day/planner-day.component';
import { PlannerDaysComponent } from './components/planner-days/planner-days.component';
import { PlannerWeekComponent } from './components/planner-week/planner-week.component';
import { PlannerMonthComponent } from './components/planner-month/planner-month.component';
import { DragulaModule } from 'ng2-dragula';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragulaModule.forRoot(),
        SharedModule,
        TimeframeModule,
        FontAwesomeModule,
        MatDatepickerModule
    ],
    declarations: [
        PlannerComponent,
        PlannerDayComponent,
        PlannerDaysComponent,
        PlannerWeekComponent,
        PlannerMonthComponent
    ],
    providers: [
        PlannerService
    ],
    exports: [
        PlannerComponent,
        PlannerDayComponent,
        PlannerDaysComponent,
        PlannerWeekComponent,
        PlannerMonthComponent
    ]
})
export class PlannerModule {
}
