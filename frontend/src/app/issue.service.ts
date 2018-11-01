import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private protocol = 'http';
  private host = 'localhost';
  private port = '4000';

  public endpoint_url = `${this.protocol}://${this.host}:${this.port}`;

  constructor(private http: HttpClient) { }

  public getIssues(){
    return this.http.get(`${this.endpoint_url}/issues`);
  }

  public getIssueById(id){
    return this.http.get(`${this.endpoint_url}/issues/${id}`);
  }

  public addIssue(title, assigned_to, description, severity, status){

    const issue = {
      title : title,
      assigned_to : assigned_to,
      description : description,
      severity : severity,
      status : status
    }

    return this.http.post(`${this.endpoint_url}/issues/create`, issue);
  }

  public updateIssue(id, title, assigned_to, description, severity, status){
    const issue = {
      id : id,
      title : title,
      assigned_to : assigned_to,
      description : description,
      severity : severity,
      status : status,
    }

    return this.http.post(`${this.endpoint_url}/issues/update/${id}`, issue);
  }

  public updateIssueWhole(issue){
    return this.http.post(`${this.endpoint_url}/issues/update/${issue.id}`, issue);
  }

  public deleteIssue(id){
    return this.http.delete(`${this.endpoint_url}/issues/delete/${id}`);
  }
}
