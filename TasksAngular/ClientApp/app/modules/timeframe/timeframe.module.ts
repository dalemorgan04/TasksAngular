import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { TimeframeComponent } from './timeframe.component';
import { TimeframeService } from './timeframe.service';

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
    providers: [
        TimeframeService
    ],
    exports: [
        TimeframeComponent
    ]
})
export class TimeframeModule {
}
