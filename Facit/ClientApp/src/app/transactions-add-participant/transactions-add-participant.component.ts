import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../../models/person';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-transactions-add-participant',
    templateUrl: './transactions-add-participant.component.html',
    styleUrls: ['./transactions-add-participant.component.css']
})
export class TransactionsAddParticipantComponent implements OnInit {

    form: FormGroup;
    public people: Person[];

    constructor(
        private formBuilder: FormBuilder,
        private service: PeopleService,
        public dialogRef: MatDialogRef<TransactionsAddParticipantComponent>) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            personId: null
        });
        this.service.getData()
            .subscribe(rslt => this.people = rslt);
    }

    submit(form) {
        console.log("dialog submitted");
        this.dialogRef.close(`${form.value.personId}`);
    }

}
