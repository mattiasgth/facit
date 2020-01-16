import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TransactionsNewComponent } from './transactions-new/transactions-new.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'project/:id',
        component: ProjectDetailsComponent
    },
    {
        path: 'transactions',
        component: TransactionsComponent
    },
    {
        path: 'transaction/:id',
        component: TransactionDetailsComponent
    },
    {
        path: 'person/:id',
        component: PersonDetailsComponent
    },
    {
        path: 'transactions/new',
        component: TransactionsNewComponent
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
