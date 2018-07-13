import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { SharedModule } from '../shared/shared.module';
import { ThoughtsService } from './thoughts.service';
import { ThoughtsComponent } from './pages/thoughts.component';
import { ThoughtsSideBarComponent } from './components/thoughts-sidebar/thoughts-sidebar.component';
import { ThoughtsListComponent } from './components/thoughts-list/thoughts-list.component';
import { ThoughtsAddComponent } from './components/thoughts-add/thoughts-add.component';
import { TimeframeModule } from '../timeframe/timeframe.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        DragulaModule,
        SharedModule,
        TimeframeModule,
        FontAwesomeModule
    ],
    declarations: [
        ThoughtsComponent,
        ThoughtsListComponent,
        ThoughtsSideBarComponent,
        ThoughtsAddComponent
    ],
    providers: [
        ThoughtsService
    ],
    exports: [
        ThoughtsComponent,
        ThoughtsListComponent,
        ThoughtsSideBarComponent,
        ThoughtsAddComponent
    ]
})
export class ThoughtsModule {
}