import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSnackBar } from '@angular/material'
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColumns = ['title','assigned_to', 'severity', 'status', 'description', 'actions'];

  constructor(private issueService: IssueService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues(){
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data;
    });
  }

  editIssue(id){
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id){
    this.issueService.deleteIssue(id).subscribe(()=>{
      this.snackBar.open('Issue '+ id + ' correctly deleted.', 'OK', { duration : 2500 });
      this.fetchIssues();
    })
  }

}
