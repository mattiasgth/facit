import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Person } from '../../models/person';
import { Balance } from '../../models/balance';

@Component({
    selector: 'app-project-members',
    templateUrl: './project-members.component.html',
    styleUrls: ['./project-members.component.css']
})
export class ProjectMembersComponent implements OnInit {

    @Input() projectId: number;
    members: Person[];
    balances = new Array();
    public loading: boolean;

    constructor(private service: ProjectsService) { }

    ngOnInit() {
        this.loading = true;
        this.service.getMembers(this.projectId)
            .subscribe(rslt => {
                this.members = rslt;
                this.service.getBalancesByProjectId(this.projectId)
                    .subscribe(rslt => {
                        rslt.forEach((i, idx) => {
                            this.balances[i.personId] = i.balance;
                        });
                        this.loading = false;
                    });
            },
                err => {
                    this.loading = false;
                });
    }

    balanceByPersonId(personId: number) {
        if (this.balances) {
            let b = this.balances.find(x => x.personId === personId);
            if (b) {
                return b.balance;
            }
        }
        return 0;
    }

}
