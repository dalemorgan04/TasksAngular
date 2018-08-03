import { MomentDateAdapter } from '@angular/material-moment-adapter';

export class CustomDateAdapter extends MomentDateAdapter {

    getFirstDayOfWeek(): number {
        //Sunday - 0 , Monday - 1 etc.
        return 1;
    }
}
