import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Person } from '../../models/person';
import { PeopleService } from '../people.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-person-details',
    templateUrl: './person-details.component.html',
    styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {
    public personId: string;
    private person$: Observable<Person>;
    public person: Person;

    constructor(private route: ActivatedRoute,
        private service: PeopleService,
        private location: Location) { }

    ngOnInit() {
        this.person$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.personId = params.get('id');
                return this.service.getPersonById(+this.personId);
            })
        );
        this.person$.subscribe((rslt: Person) => {
            this.person = rslt;
        });
    }

    onBackClick() {
        this.location.back();
    }

    onDeleteClick() {

    }

}
