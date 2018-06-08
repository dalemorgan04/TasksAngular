import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModuleShared } from './app.shared.module';
import { LayoutComponent } from './modules/layout/pages/layout.component';

@NgModule({
    bootstrap: [ LayoutComponent ],
    imports: [
        ServerModule,
        AppModuleShared
    ]
})
export class AppModule {
}