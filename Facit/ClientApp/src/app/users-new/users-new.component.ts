import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../../models/user';

@Component({
    selector: 'app-users-new',
    templateUrl: './users-new.component.html',
    styleUrls: ['./users-new.component.css']
})
export class UsersNewComponent implements OnInit {

    public loading: boolean;
    public userForm: FormGroup;

    constructor(
        private service: AuthService,
        private snackbar: MatSnackBar,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', Validators.email]
        });

    }
    onSubmit() {
        this.loading = true;
        this.service.addUser(this.userForm.value as User)
            .subscribe(
                rslt => {
                    this.loading = false;
                    console.warn(rslt)
                },
                err => {
                    this.snackbar.open("An error occurred", err.error.Message, {
                        duration: 2000,
                    });
                    this.loading = false;
                });
    }

}
