import { Transaction } from "./transaction";
import { Person } from "./person";

export interface TransactionItem {
    id: number;
    who: Person;
    description: string;
    when: Date;
}
