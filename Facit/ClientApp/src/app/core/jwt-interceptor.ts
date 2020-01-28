import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, ɵHttpInterceptingHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if user is logged in, and if request targets api, add jwt token
        const loggedInUser = this.authService.currentUserValue;
        const isLoggedIn = loggedInUser && loggedInUser.token;
        const isApiRequest = req.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiRequest) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${loggedInUser.token}`
                }
            });
        }

        return next.handle(req);
    }
}
