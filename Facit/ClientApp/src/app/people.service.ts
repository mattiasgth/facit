import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

    constructor(private client: HttpClient) { }

    public getData(): Observable<Person[]> {
        return this.client.get<Person[]>('api/people');
    }

    public getPersonById(id: number): Observable<Person> {
        return this.client.get<Person>('api/people/' + id);
    }
}
