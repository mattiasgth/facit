import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatSnackBarModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, NativeDateModule, MatNativeDateModule, MatGridListModule, MatSelectModule, MatCheckboxModule, MatSlideToggleModule, MatRadioButton, MatRadioModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ProjectMembersComponent } from './project-members/project-members.component';
import { ProjectTransactionsComponent } from './project-transactions/project-transactions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TransactionDialogComponent } from './transaction-dialog/transaction-dialog.component';
import { TransactionsNewComponent } from './transactions-new/transactions-new.component';
import { TransactionsAddParticipantComponent } from './transactions-add-participant/transactions-add-participant.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { LoadingComponent } from './core/loading.component';

@NgModule({ 
    declarations: [
        AppComponent,
        ProjectsListComponent,
        ProjectsComponent,
        HomeComponent,
        NavComponent,
        ProjectMembersComponent,
        ProjectTransactionsComponent,
        TransactionsComponent,
        TransactionsListComponent,
        ProjectDetailsComponent,
        TransactionDialogComponent,
        TransactionsNewComponent,
        TransactionsAddParticipantComponent,
        TransactionDetailsComponent,
        PersonDetailsComponent,
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NoopAnimationsModule,
        HttpClientModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatButtonModule,
        MatRadioModule,
        MatSelectModule,
        LayoutModule,
        MatSidenavModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatGridListModule,
        MatInputModule,
        MatListModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatCardModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        FlexLayoutModule

    ],
    entryComponents: [
        TransactionDialogComponent,
        TransactionsAddParticipantComponent
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
