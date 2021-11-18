export interface EventModel{
    data: Event[]
}

export interface Event {
    id: number;
    subject: string;
    startTime: Date;
    endTime: Date;
    isAllDay: boolean;
    location: string;
    categoryColor: string;
}