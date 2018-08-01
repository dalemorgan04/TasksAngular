import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { TimeframeComponent } from './pages/timeframe.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [
        TimeframeComponent
    ],
    exports: [
        TimeframeComponent
    ]
})
export class TimeframeModule {
}
