import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../people.service';
import { Person } from '../../models/person';

@Component({
    selector: 'app-people-new',
    templateUrl: './people-new.component.html',
    styleUrls: ['./people-new.component.css']
})
export class PeopleNewComponent implements OnInit {

    public personForm: FormGroup;
    constructor(
        private service: PeopleService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.personForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email1: ['', Validators.email],
            email2: ['', Validators.email],
            phone1: '',
            phone2: '',
            birthDate: '',
        });
    }

    onSubmit() {
        this.service.addPerson(this.personForm.value as Person)
            .subscribe(rslt => console.warn(rslt));
    }
}
