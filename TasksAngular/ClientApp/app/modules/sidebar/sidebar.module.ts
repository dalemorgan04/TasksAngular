import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MATERIAL_SANITY_CHECKS } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimeframeModule } from '../timeframe/timeframe.module';
import { SharedModule } from '../shared/shared.module';
import { SidebarThoughtsAddComponent } from './components/thoughts-add/thoughts-add.component';
import { SidebarThoughtsEditComponent } from './components/thoughts-edit/thoughts-edit.component';
import { SidebarService } from './sidebar.service';
import { SidebarComponent } from './sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DragulaModule,
        SharedModule,
        TimeframeModule,
        FontAwesomeModule,
        MatDatepickerModule
    ],
    declarations: [
        SidebarComponent,
        SidebarThoughtsAddComponent,
        SidebarThoughtsEditComponent
    ],
    providers: [
        SidebarService,
        {
            provide: MATERIAL_SANITY_CHECKS,
            useValue: false
        }
    ],
    exports: [
        SidebarComponent,
        SidebarThoughtsAddComponent,
        SidebarThoughtsEditComponent
    ]
})
export class SidebarModule {
}
