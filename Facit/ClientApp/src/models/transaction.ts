import { Project } from "./project";
import { Person } from "./person";
import { Currency } from "./currency";
import { TransactionItem } from './transactionItem';

export interface Transaction {
    id: number;
    project: Project;
    description: string;
    when: Date;
    createdBy: Person;
    currencyLocal: Currency;
    participants: TransactionItem[];
}
