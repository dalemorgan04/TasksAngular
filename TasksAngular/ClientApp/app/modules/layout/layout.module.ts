import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './pages/layout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        LayoutComponent,
        NavComponent
    ],
    exports: [
        LayoutComponent,
        NavComponent
    ]
})
export class LayoutModule {
}