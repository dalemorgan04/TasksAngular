import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MATERIAL_SANITY_CHECKS } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/pages/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavService } from './components/nav/nav.service';
import { SidebarService } from './components/sidebar/sidebar.service';
import { ContentComponent } from './components/content/content.component';
import { AppComponent } from './pages/app.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        SharedModule
    ],
  declarations: [
        AppComponent,
        HeaderComponent,
        NavComponent,
        ContentComponent,
        FooterComponent
    ],
    providers: [
        NavService
    ],
  exports: [
        AppComponent,
        HeaderComponent,
        NavComponent,
        ContentComponent,
        FooterComponent
    ]
})

export class LayoutModule {}
