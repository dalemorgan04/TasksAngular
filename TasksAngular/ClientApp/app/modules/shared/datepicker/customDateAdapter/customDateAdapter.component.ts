import { NativeDateAdapter } from '@angular/material';


/** Adapts the native JS Date for use with cdk-based components that work with dates. */
export class CustomDateAdapter extends NativeDateAdapter {

    getFirstDayOfWeek(): number {
        //Sunday - 0 , Monday - 1 etc.
        return 1;
    }

}
