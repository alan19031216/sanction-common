import { Subjects } from "./subjects";

export interface AdminCreatedEvent {
    subject: Subjects.AdminCreated;
    data: {
        id: string;
        name: string;
    };
}
