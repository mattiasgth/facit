import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TransactionsNewComponent } from './transactions-new/transactions-new.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { PeopleComponent } from './people/people.component';
import { PeopleNewComponent } from './people-new/people-new.component';
import { UsersNewComponent } from './users-new/users-new.component';
import { ProjectsNewComponent } from './projects-new/projects-new.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'projects/new',
        component: ProjectsNewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'project/:id',
        component: ProjectDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transactions',
        component: TransactionsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transaction/:id',
        component: TransactionDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'people',
        component: PeopleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'people/new',
        component: PeopleNewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'person/:id',
        component: PersonDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'transactions/new',
        component: TransactionsNewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users/new',
        component: UsersNewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
