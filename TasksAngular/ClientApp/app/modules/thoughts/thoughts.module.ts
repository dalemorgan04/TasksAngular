﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { SharedModule } from '../shared/shared.module';
import { ThoughtsService } from './thoughts.service';
import { ThoughtsComponent } from './pages/thoughts.component';
import { ThoughtsSideBarComponent } from './components/thoughts-sidebar/thoughts-sidebar.component';
import { ThoughtsListComponent } from './components/thoughts-list/thoughts-list.component';

@NgModule({
    imports: [
        CommonModule,
        DragulaModule,
        SharedModule
    ],
    declarations: [
        ThoughtsComponent,
        ThoughtsListComponent,
        ThoughtsSideBarComponent
    ],
    providers: [
        ThoughtsService
    ],
    exports: [
        ThoughtsComponent,
        ThoughtsListComponent,
        ThoughtsSideBarComponent
    ]
})
export class ThoughtsModule {
}