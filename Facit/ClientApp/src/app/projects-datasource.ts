import { Project } from '../models/project';
import { DataSource } from '@angular/cdk/table';
import { ProjectsService } from './projects.service';
import { MatSnackBar } from '@angular/material';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';


// this class is not used

export class ProjectsDatasource implements DataSource<Project> {

    private projectsSubject = new BehaviorSubject<Project[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private service: ProjectsService, private snackBar: MatSnackBar) { }

    connect(collectionViewer: CollectionViewer): Observable<Project[]> {
        return this.projectsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.projectsSubject.complete();
        this.loadingSubject.complete();
    }

    loadProjects(filter: string = "",
        sortField: string = "", sortDirection: string = "",
        pageIndex: number = 0, pageSize: number = 50) {
        this.loadingSubject.next(true);
        this.service.getData(filter, sortField, sortDirection, pageIndex, pageSize)
            .pipe(
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(
                (dto: Project[]) => {
                    this.projectsSubject.next(dto);
                },
                err => {
                    this.snackBar.open("An error occurred", err.error.Message, {
                        duration: 2000,
                    });
                }
            );
    }
}
