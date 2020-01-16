import { Component, OnInit } from '@angular/core';
import { ProjectsDatasource } from '../projects-datasource';
import { ProjectsService } from '../projects.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { Router } from '@angular/router';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

    public displayedColumns = ["id", "description", "createdWhen"];
    public dataSource: ProjectsDatasource;
    public projects: Observable<Project[]>;

    constructor(
        private service: ProjectsService,
        private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.dataSource = new ProjectsDatasource(this.service, this.snackBar);
        this.dataSource.loadProjects();
        this.service.getData()
            .subscribe(rslt => {
                this.projects = rslt;
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
