import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: [
        'modules/shared/styles/vendor/bootstrap/bootstrap.scss',
        'modules/shared/styles/vendor/dragula.scss',
        'modules/shared/styles/vendor/material-custom-theme.scss'
    ],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
}
