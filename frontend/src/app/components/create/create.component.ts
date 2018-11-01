import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService, private router: Router, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group({
      title : ['', Validators.required],
      assigned : ['', Validators.required],
      description : "",
      severity : "",
      status : ""
    });
  }
  

  public addIssue(title, assigned_to, description, severity, status){
    this.issueService.addIssue(title, assigned_to, description, severity, status).subscribe(()=>{
      this.snackBar.open('Created the new issue " ' + title + ' "', 'OK', { duration : 2500 }).afterDismissed().subscribe(()=>{
        this.router.navigate(['/list']);
      });
    })
  }
  
  ngOnInit() {

  }

}
