import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.shared.module';
import { LayoutComponent } from './modules/layout/pages/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    bootstrap: [ LayoutComponent ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppModuleShared
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}