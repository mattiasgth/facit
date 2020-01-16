import { Injectable } from '@angular/core';
import { Currency } from '../models/currency';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransactionDTO} from '../models/transaction-new';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

    constructor(private client: HttpClient) { }

    getCurrency(id: string): Observable<Currency> {
        return this.client.get<Currency>('api/currencies/' + id);
    }

    getCurrencies(): Observable<Currency[]> {
        return this.client.get<Currency[]>('api/currencies');
    }

    getTransaction(id: string): Observable<TransactionDTO> {
        return this.client.get<TransactionDTO>('api/transactions/' + id)
    }

    addTransaction(model: TransactionDTO): Observable<any> {
        return this.client.post<Transaction>('api/transactions', model);
    }

    deleteTransaction(transactionId: number): Observable<any> {
        return this.client.delete('api/transactions/' + transactionId.toString());
    }
}
