import { TimeframeType } from './timeframe.model';

export interface IThought {
    thoughtId: number;
    userId: number;
    description: string;
    priorityId: number;
    createdDateTime: string;
    sortId: number;
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
    isSelected: boolean;
    description: string;
    timeframeType: TimeframeType;
    dateTime: Date;
}
