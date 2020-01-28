import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { PeopleService } from '../people.service';
import { filter } from 'rxjs/operators';
import { Transaction } from '../../models/transaction';
import { TransactionsService } from '../transactions.service';
import { Currency } from '../../models/currency';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { TransactionDTO } from '../../models/transaction-new';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { TransactionsAddParticipantComponent } from '../transactions-add-participant/transactions-add-participant.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../_services/auth.service';

@Component({
    selector: 'app-transactions-new',
    templateUrl: './transactions-new.component.html',
    styleUrls: ['./transactions-new.component.css']
})
export class TransactionsNewComponent implements OnInit {

    public currencies: Currency[];
    public transactionForm: FormGroup;
    public participants: FormArray;
    public subTotal: number;

    constructor(private peopleService: PeopleService,
        private route: ActivatedRoute,
        private service: TransactionsService,
        private projectService: ProjectsService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        public dialog: MatDialog) { }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                this.loadByProject(params.project);
            });
    }

    loadByProject(projectId: number) {
        let personId = this.authService.currentUserValue.person.id;
        this.service.getCurrencies()
            .subscribe(rslt => this.currencies = rslt);
        this.transactionForm = this.formBuilder.group({
            description: new FormControl(),
            when: new FormControl(new Date()),
            projectId: new FormControl(projectId),
            createdById: new FormControl(personId),
            currencyLocalId: new FormControl(1),
            totalAmount: new FormControl(0.0),
            participants: this.formBuilder.array([])
        });

        this.projectService.getMembers(projectId)
            .subscribe((rslt: Person[]) => {
                rslt.forEach((value: Person, index: number) => {
                    this.participants = this.transactionForm.get('participants') as FormArray;
                    this.participants.push(this.createParticipant(value));
                });
            });

        this.transactionForm.valueChanges
            .subscribe(form => {
                this.subTotal = form.participants.reduce((sum, item) => sum += (+item.credit || 0), 0);
                // this.participants.controls.forEach(ctrl =>
                // console.log(ctrl)
                // );
            });
    }

    createParticipant(p: Person): FormGroup {
        return this.formBuilder.group({
            name: p.firstName + (p.lastName ? (' ' + p.lastName[0]) : ''),
            personId: p.id,
            credit: null,
            debit: null
        });
    }

    onClickedShareEven() {
        let v = this.subTotal / this.participants.controls.length;
        this.participants.controls.forEach(ctrl =>
            ctrl.get('debit').setValue(v)
        );
    }

    onClickedAddParticipant() {

        const dialogRef = this.dialog.open(TransactionsAddParticipantComponent, {
            width: '660px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.peopleService.getPersonById(+result)
                    .subscribe(person => {
                        person.id = result;
                        this.participants = this.transactionForm.get('participants') as FormArray;
                        this.participants.push(this.createParticipant(person));
                    });
            }
        });
    }

    onSubmit() {
        this.service.addTransaction(this.transactionForm.value as TransactionDTO)
            .subscribe(rslt => console.warn(rslt));
    }
}
