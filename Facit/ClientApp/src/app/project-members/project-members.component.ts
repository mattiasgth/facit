import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-project-members',
    templateUrl: './project-members.component.html',
    styleUrls: ['./project-members.component.css']
})
export class ProjectMembersComponent implements OnInit {

    @Input() members: any;

    constructor() { }

    ngOnInit() {
    }
}
