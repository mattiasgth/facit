import { TransactionItemDTO } from './transactionItem-new';

export interface TransactionDTO {
    projectId: number;
    description: string;
    when: Date;
    createdById: number;
    currencyLocalId: number;
    participants: TransactionItemDTO[];
}
