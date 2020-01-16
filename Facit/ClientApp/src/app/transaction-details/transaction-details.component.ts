import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Transaction } from '../../models/transaction';
import { switchMap, filter } from 'rxjs/operators';
import { TransactionsService } from '../transactions.service';
import { TransactionDTO } from '../../models/transaction-new';
import { Currency } from '../../models/currency';
import { Person } from '../../models/person';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {

    private transactionId: string;
    private transaction$: Observable<TransactionDTO>;
    public transaction: TransactionDTO;
    public currencyLocal: Currency;
    public creator: Person;

    constructor(private route: ActivatedRoute,
        private service: TransactionsService,
        private peopleService: PeopleService,
        private location: Location) { }

    ngOnInit() {
        this.transaction$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.transactionId = params.get('id');
                return this.service.getTransaction(this.transactionId);
            })
        );
        this.transaction$.subscribe((rslt: TransactionDTO) => {
            this.transaction = rslt;
            this.peopleService.getPersonById(this.transaction.createdById)
                .subscribe(rslt => this.creator = rslt);
            this.service.getCurrency(this.transaction.currencyLocalId.toString())
                .subscribe(rslt => this.currencyLocal = rslt);
        });
    }

    onBackClick() {
        this.location.back();
    }

    onDeleteClick() {
        if (confirm("Really?")) {
            this.service.deleteTransaction(+this.transactionId)
                .subscribe(rslt =>
                    this.location.back()
                    );
        }
    }

}
