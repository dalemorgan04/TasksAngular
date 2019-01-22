import { TimeframeType } from './timeframe.model';
import { Data } from '@angular/router';

export interface IThought {
    thoughtId: number;
    userId: number;
    description: string;
    priorityId: number;
    createdDateTime: string;
    sortId: number;
    dateTime: Date;
    timeFrameId: number;
    timeFrameDateString: string;
    timeFrameTimeString: string;
    timeFrameWeekString: string;
    timeFrameDueString: string;
}

export interface IAddThought {
    description: string;
    timeframeType: TimeframeType;
    dateTime: Date;
}

export interface IEditThought {    
    id: number;
    description: string;
    timeframeType: TimeframeType;
    dateTime: Date;
}
