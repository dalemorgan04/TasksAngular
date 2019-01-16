export enum PlannerItemType {
    thought,
    task,
    habit,
    event
}

export interface IPlannerItem {
    plannerItemType: PlannerItemType;
    id: number;    
    userId: number;
    description: string;
    priorityId: number;
    createdDateTime: string;
    sortId: number;
    timeFrameId: number;
}
