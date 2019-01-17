export enum PlannerItemType {
    thought,
    task,
    habit,
    event
}

export interface IPlannerItem {
    plannerItemType: PlannerItemType;
    id: number;        
    description: string;    
    timeFrameId: number;
}
