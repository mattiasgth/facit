import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { Project } from '../../models/project';
import { Router } from '@angular/router';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

    public projects: Observable<Project[]>;
    public loading: boolean;


    constructor(
        private service: ProjectsService,
        private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.service.getData()
            .subscribe(rslt => {
                this.projects = rslt;
                this.loading = false;
            },
                err => {
                    console.log(err);
                    this.loading = false;
                });
    }

    onDeleteProject(projectId: string) {
        if (confirm("Really?")) {
            this.service.deleteProject(projectId)
                .subscribe(rslt =>
                    console.log("ok")
                );
        }
    }

    onNewTransactionClicked(projectId: string) {
        this.router.navigate(['/transactions/new/'],
            {
                queryParams: { project: projectId }
            }
        );
    }

    onDetailsClicked(project: Project) {
        this.router.navigate(['/project', project.id]);
    }
}
