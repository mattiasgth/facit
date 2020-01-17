import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-project-transactions',
    templateUrl: './project-transactions.component.html',
    styleUrls: ['./project-transactions.component.css']
})
export class ProjectTransactionsComponent implements OnInit {
    @Input() transactions: any;

    constructor() { }

    ngOnInit() {
    }
}
