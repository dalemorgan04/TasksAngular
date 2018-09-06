import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SharedModule } from '../shared/shared.module';
import { ThoughtsService } from './thoughts.service';
import { ThoughtsComponent } from './pages/thoughts.component';
import { ThoughtsListComponent } from './components/thoughts-list/thoughts-list.component';
import { ThoughtsAddComponent } from './components/thoughts-add/thoughts-add.component';
import { ThoughtsEditComponent } from './components/thoughts-edit/thoughts-edit.component';
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
        ThoughtsListComponent,
        ThoughtsAddComponent,
        ThoughtsEditComponent
    ],
    providers: [
        ThoughtsService
    ],
    exports: [
        ThoughtsComponent,
        ThoughtsListComponent,
        ThoughtsAddComponent,
        ThoughtsEditComponent
    ]
})
export class ThoughtsModule {
}
