import { Role } from './role';
import { Person } from './person';

export class User {
    id: number;
    person: Person;
    username: string;
    email: string;
    password: string;
    role: Role;
    token?: string;
}
