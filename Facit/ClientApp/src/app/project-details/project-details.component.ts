import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';

@Component({
    selector: 'app-project-details',
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

    private project$: Observable<Project>;
    public project: Project;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProjectsService,
        private location: Location
    ) { }

    ngOnInit() {
        this.project$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) =>
                this.service.getProject(params.get('id')))
        );
        this.project$.subscribe((rslt:Project) => this.project = rslt);
    }

    onBackClicked() {
        this.location.back();
    }

    onNewTransactionClicked() {
        this.router.navigate(['/transactions/new/'],
            {
                queryParams: { project: this.project.id }
            }
        );
    }

}
