import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//Routing
import { RouterModule, Routes } from '@angular/router';
import { PlannerComponent } from './modules/planner/planner.component';
import { ThoughtsComponent } from './modules/thoughts/thoughts.component';
const appRoutes: Routes = [
    { path: '', redirectTo: 'thought', pathMatch: 'full' },
    { path: 'thought', component: ThoughtsComponent },
    { path: 'planner', component: PlannerComponent },
    { path: '**', redirectTo: '' }
];

//Modules
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { SharedModule } from './modules/shared/shared.module';
import { SidebarModule } from './modules/sidebar/sidebar.module';
import { ThoughtsModule } from './modules/thoughts/thoughts.module';
import { PlannerModule } from './modules/planner/planner.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { TimeframeModule } from './modules/timeframe/timeframe.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes, {enableTracing: false}),
        LayoutModule,
        FlexLayoutModule,
        SharedModule,
        TimeframeModule,
        SidebarModule,
        ThoughtsModule,
        PlannerModule
    ],
    declarations: [
        AppComponent
    ],
    exports: [
        AppComponent
    ]
})
export class AppModuleShared {
}
