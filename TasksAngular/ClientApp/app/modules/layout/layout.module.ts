import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavService } from './components/nav/nav.service';
import { ContentComponent } from './components/content/content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './pages/app.component';
import { MATERIAL_SANITY_CHECKS } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        SharedModule
    ],
  declarations: [
        AppComponent,
        LayoutComponent,
        HeaderComponent,
        NavComponent,
        ContentComponent,
        FooterComponent
    ],
    providers: [
      NavService,
      {
        provide: MATERIAL_SANITY_CHECKS,
        useValue: false
      }
    ],
  exports: [
        AppComponent,
        LayoutComponent,
        HeaderComponent,
        NavComponent,
        ContentComponent,
        FooterComponent
    ]
})
export class LayoutModule {
}
