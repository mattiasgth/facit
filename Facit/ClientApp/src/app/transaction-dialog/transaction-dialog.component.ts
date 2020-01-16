import { Component, OnInit, Inject } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PeopleService } from '../people.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css']
})
export class TransactionDialogComponent implements OnInit {

    public people: Person[];

    public displayedColumns: string[] = ["name", "debit", "credit"];

    constructor(
        private peopleService: PeopleService,
        public dialogRef: MatDialogRef<TransactionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Transaction) { }

    ngOnInit() {
        this.peopleService.getData()
            .subscribe(rslt => this.people = rslt);
  }
}
