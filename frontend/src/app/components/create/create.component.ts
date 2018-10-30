import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private issueService: IssueService) { }

  
  ngOnInit() {

    const issue = {
      title : 'An hardcoded issue from front end',
      assigned_to : 'anyone who wants',
      description : 'This is an hardcoded issue sent using our newly Issue services',
      status : 'Open',
      severity : 3
    }

    var { title, assigned_to, description, status, severity } = issue;

    this.issueService.addIssue(title, assigned_to, description, severity, status);

  }

}
