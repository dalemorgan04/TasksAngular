import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SharedModule } from '../shared/shared.module';
import { ThoughtsService } from './thoughts.service';
import { ThoughtsComponent } from './thoughts.component';
import { ThoughtsListComponent } from './components/thoughts-list/thoughts-list.component';
import { TimeframeModule } from '../timeframe/timeframe.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
        ThoughtsComponent,
        ThoughtsListComponent
    ],
    providers: [
        ThoughtsService
    ],
    exports: [
        ThoughtsComponent,
        ThoughtsListComponent
    ]
})
export class ThoughtsModule {
}
