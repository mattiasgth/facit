import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public loggedInUser: User;
    public title: string = "Facit";

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.loggedInUser = this.authService.currentUserValue;
    }

    get isLoggedIn(): boolean {
        return this.authService.currentUserValue != null;
    }

}
