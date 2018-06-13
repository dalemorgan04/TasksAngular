import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThoughtListComponent } from './components/thoughtList/thoughtList.component';
import { ThoughtsService } from './thoughts.service';
import { ThoughtsComponent } from './pages/thoughts.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        ThoughtsComponent,
        ThoughtListComponent
    ],
    providers: [
        ThoughtsService
    ],
    exports: [
        ThoughtsComponent,
        ThoughtListComponent
    ]
})
export class ThoughtsModule {
}