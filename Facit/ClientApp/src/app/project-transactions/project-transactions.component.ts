import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Transaction } from '../../models/transaction';
import { RouterLinkActive, Router } from '@angular/router';

@Component({
    selector: 'app-project-transactions',
    templateUrl: './project-transactions.component.html',
    styleUrls: ['./project-transactions.component.css']
})
export class ProjectTransactionsComponent implements OnInit {
    @Input() projectId: number;

    public loading: boolean;
    transactions: Transaction[];

    constructor(
        private service: ProjectsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loading = true;
        this.service.getTransactionsByProjectId(this.projectId)
            .subscribe(rslt => {
                this.transactions = rslt;
                this.loading = false;
            },
                err => {
                    this.loading = false;
                });
    }
}
