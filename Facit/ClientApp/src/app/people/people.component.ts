import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Person } from '../../models/person';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html',
    styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

    public loading: boolean;
    public people: Person[];
    constructor(private service: PeopleService,
        private location: Location,
        private router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.service.getData()
            .subscribe(
                rslt => {
                    this.people = rslt;
                    this.loading = false;
                },
                err => {
                    this.loading = false;
                });
    }

    onBackClick() {
        this.location.back();
    }

    onNewPersonClick() {
        this.router.navigate(['/people/new/']);
    }
}
