import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './pages/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavService } from './components/nav/nav.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        LayoutComponent,
        NavComponent,
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        NavService
    ],
    exports: [
        LayoutComponent,
        NavComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class LayoutModule {
}