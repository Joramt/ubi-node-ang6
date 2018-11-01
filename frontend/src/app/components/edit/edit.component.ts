import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id : String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.createForm();
  }

  private createForm(){
    this.updateForm = this.formBuilder.group({
      title : ['', Validators.required],
      assigned_to : ['', Validators.required],
      description : "",
      severity : "",
      status : ""
    });  
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('assigned_to').setValue(this.issue.assigned_to);
        this.updateForm.get('status').setValue(this.issue.status);
        this.updateForm.get('description').setValue(this.issue.description);
      });
    });
  }

  updateIssue(title, assigned_to, description, severity, status){

    this.issueService.updateIssue(this.id, title, assigned_to, description, severity, status).subscribe(()=>{
      this.snackBar.open('Issue "' + this.issue.title + '" ( ID ' + this.id + ') correctly updated.', 'OK', { duration : 2500 }).afterDismissed().subscribe(()=>{
        this.router.navigate(['/list']);
      });
    });
  }
  
}
