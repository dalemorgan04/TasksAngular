import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: [
        '../../shared/styles/vendor/bootstrap/bootstrap.scss',
        '../../shared/styles/vendor/dragula.scss',
        '../../shared/styles/vendor/material-custom-theme.scss',
        './app.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
}
