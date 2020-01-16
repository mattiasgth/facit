import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { Transaction } from '../models/transaction';
import { Project } from '../models/project';
import { Balance } from '../models/balance';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

    constructor(private client: HttpClient) { }

    getProject(id: string): Observable<Project> {
        return this.client.get<Project>('api/projects/' + id);
    }

    deleteProject(id: string): Observable<any> {
        return this.client.delete<any>('api/projects/' + id);
    }

    getData(filter: string = '', sortField: string = 'id', sortDirection: string = 'asc',
        pageIndex: number = 0, pageSize: number = 30)
    : Observable<any>
    {
        return this.client.get<any>('api/projects', {
            params: new HttpParams()
                .set('filter', filter)
                .set('sortField', sortField)
                .set('sortDirection', sortDirection)
                .set('pageNumber', pageIndex.toString())
                .set('pageSize', pageSize.toString())
        });
    }

    getMembers(projectId: number): Observable<Person[]> {
        return this.client.get<Person[]>('api/projects/' + projectId + '/members');
    }

    getTransactionsByProjectId(projectId: number): Observable<Transaction[]> {
        return this.client.get<Transaction[]>('api/projects/' + projectId + '/transactions');
    }

    getBalancesByProjectId(projectId: number): Observable<Balance[]> {
        return this.client.get<Balance[]>('api/projects/' + projectId + '/balances');
    }
}
