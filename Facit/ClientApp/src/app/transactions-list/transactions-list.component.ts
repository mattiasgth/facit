import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../models/transaction';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-transactions-list',
    templateUrl: './transactions-list.component.html',
    styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {
    @Input() projectId: number;
    public transactions: Transaction[];
    public displayedColumns: string[] = ["id", "description", "when"];
    constructor(private service: ProjectsService, private router: Router) { }

    ngOnInit() {
        this.service.getTransactionsByProjectId(this.projectId)
            .subscribe((rslt:Transaction[]) => {
                this.transactions = rslt;
                console.log(this.transactions);
            });
    }

    onRowClicked(row: Transaction) {
        this.router.navigate(['transaction/', row.id]);
    }



}
