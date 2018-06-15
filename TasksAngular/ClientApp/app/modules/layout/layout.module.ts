import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './pages/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavService } from './components/nav/nav.service';
import { ContentComponent } from './components/content/content.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        NavComponent,
        ContentComponent,
        FooterComponent
    ],
    providers: [
        NavService
    ],
    exports: [
        LayoutComponent,
        HeaderComponent,
        NavComponent,
        ContentComponent,
        FooterComponent
    ]
})
export class LayoutModule {
}