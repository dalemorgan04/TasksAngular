import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar/sidebar.service';

@NgModule({
    declarations: [ 
    ],
    providers: [
        SidebarService
    ],
    imports: [
        CommonModule
    ],
    exports: [
    ]
})
export class SharedModule {}