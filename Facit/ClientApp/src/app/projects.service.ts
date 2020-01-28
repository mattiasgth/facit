import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { Transaction } from '../models/transaction';
import { Project } from '../models/project';
import { Balance } from '../models/balance';
import { environment } from '../environments/environment';
import { Currency } from '../models/currency';
import { ProjectNewDTO } from '../models/project-new';
import { ProjectListDTO } from '../models/project-list-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

    constructor(private client: HttpClient) { }

    getProject(id: string): Observable<Project> {
        return this.client.get<Project>(`${environment.apiUrl}/projects/${id}`);
    }

    deleteProject(id: string): Observable<any> {
        return this.client.delete<any>(`${environment.apiUrl}/projects/${id}`);
    }

    getData(filter: string = '', sortField: string = 'id', sortDirection: string = 'asc',
        pageIndex: number = 0, pageSize: number = 30)
    : Observable<ProjectListDTO[]>
    {
        return this.client.get<ProjectListDTO[]>(`${environment.apiUrl}/projects`, {
            params: new HttpParams()
                .set('filter', filter)
                .set('sortField', sortField)
                .set('sortDirection', sortDirection)
                .set('pageNumber', pageIndex.toString())
                .set('pageSize', pageSize.toString())
        });
    }

    getMembers(projectId: number): Observable<Person[]> {
        return this.client.get<Person[]>(`${environment.apiUrl}/projects/${projectId}/members`);
    }

    getTransactionsByProjectId(projectId: number): Observable<Transaction[]> {
        return this.client.get<Transaction[]>(`${environment.apiUrl}/projects/${projectId}/transactions`);
    }

    getBalancesByProjectId(projectId: number): Observable<Balance[]> {
        return this.client.get<Balance[]>(`${environment.apiUrl}/projects/${projectId}/balances`);
    }

    getCurrencies(): Observable<Currency[]> {
        return this.client.get<Currency[]>('api/currencies');
    }
    addProject(project: ProjectNewDTO) {
        return this.client.post<Project>('api/projects', project);
    }
}
