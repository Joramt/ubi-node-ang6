import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private issueService: IssueService) { }

  ngOnInit() {
    const issue = {
      id : 'EDIT ME',
      title : 'An hardcoded issue updated from front end',
      assigned_to : 'anyone who wants',
      description : 'This is an hardcoded issue updated using our newly Issue services',
      status : 'Open',
      severity : 3
    }

    var { id, title, assigned_to, description, status, severity } = issue;

    this.issueService.updateIssue(id, title, assigned_to, description, severity, status);

  }

}
