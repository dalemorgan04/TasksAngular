import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MATERIAL_SANITY_CHECKS } from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LayoutComponent } from './layout.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavService } from './components/nav/nav.service';
import { ContentComponent } from './components/content/content.component';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        SharedModule,
        SidebarModule
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

export class LayoutModule {}
