import { Person } from "./person";

export interface Project {
    id: number;
    description: string;
    createdWhen: Date;
    createdBy: Person;
    isActive: boolean;
}
