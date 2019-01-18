import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PlannerComponent } from './planner.component';
import { TimeframeModule } from '../timeframe/timeframe.module';
import { PlannerDayComponent } from './components/planner-day/planner-day.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragulaModule,
        SharedModule,
        TimeframeModule,
        FontAwesomeModule,
        MatDatepickerModule
    ],
    declarations: [
        PlannerComponent,
        PlannerDayComponent
    ],
    providers: [
        
    ],
    exports: [
        PlannerComponent,
        PlannerDayComponent
    ]
})
export class PlannerModule {
}
