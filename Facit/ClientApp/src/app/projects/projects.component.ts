import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

    public pageTitle: string = 'FACIT';
    constructor(private title: Title) { }

    ngOnInit() {
        this.title.setTitle(this.pageTitle);
    }

    onNewProjectClick() {
        alert('Inte implementerat!');
    }

}
