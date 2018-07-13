import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//Routing
import { RouterModule } from '@angular/router';
import { ThoughtsComponent } from './modules/thoughts/pages/thoughts.component';
//Modules
import { LayoutModule } from './modules/layout/layout.module';
import { SharedModule } from './modules/shared/shared.module';
import { TimeframeModule } from './modules/timeframe/timeframe.module';
import { ThoughtsModule } from './modules/thoughts/thoughts.module';

@NgModule({
    imports: [
        CommonModule,
        //HttpModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'thought', pathMatch: 'full' },
            { path: 'thought', component: ThoughtsComponent },
            { path: '**', redirectTo: '' }
        ]),
        LayoutModule,
        SharedModule,
        TimeframeModule,
        ThoughtsModule
    ]
})
export class AppModuleShared {
}