import { Component, OnInit } from '@angular/core';
import { Currency } from '../../models/currency';
import { ProjectsService } from '../projects.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Project } from '../../models/project';
import { ProjectNewDTO } from '../../models/project-new';
import { AuthService } from '../_services/auth.service';

@Component({
    selector: 'app-projects-new',
    templateUrl: './projects-new.component.html',
    styleUrls: ['./projects-new.component.css']
})
export class ProjectsNewComponent implements OnInit {

    public loading: boolean;
    public currencies: Currency[];
    public projectForm: FormGroup;
    constructor(private service: ProjectsService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private snackbar: MatSnackBar) { }

    ngOnInit() {
        this.projectForm = this.formBuilder.group({
            description: ['', Validators.required],
            createdById: this.authService.currentUserValue.id,
            baseCurrencyId: [0, Validators.required]
        });
        this.service.getCurrencies()
            .subscribe(rslt => {
                this.currencies = rslt;
            });
    }

    onSubmit() {
        this.loading = true;
        this.service.addProject(this.projectForm.value as ProjectNewDTO)
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
