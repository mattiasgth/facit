import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { ProjectsService } from '../projects.service';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

    public transactions: Observable<Transaction[]>;

    constructor(
        private service: ProjectsService,
        public dialog: MatDialog) { }

    ngOnInit() {
        this.service.getTransactionsByProjectId(1);       
    }


    onNewTransactionClick() {
        const dialogRef = this.dialog.open(TransactionDialogComponent, {
            width: '660px',
            data: { }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log("ok");
            }
        });

    }

}
