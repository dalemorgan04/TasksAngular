import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarService } from './sidebar.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        
    ],
    providers: [
        SidebarService
    ],
    exports: [
        
    ]
})
export class SidebarModule {
}
