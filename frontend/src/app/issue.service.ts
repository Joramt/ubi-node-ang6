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

  public addIssue(title, responsible, description, severity, status){
    
    const issue = {
      title : title,
      responsible : responsible,
      description : description,
      severity : severity,
      status : status
    }

    return this.http.post(`${this.endpoint_url}/issue/add`, issue);
  }

  public updateIssue(id, title, responsible, description, severity, status){
    const issue = {
      id : id,
      title : title,
      responsible : responsible,
      description : description,
      severity : severity,
      status : status,
    }

    return this.http.post(`${this.endpoint_url}/issue/update/${id}`, issue);
  }

  public deleteIssue(id){
    return this.http.delete(`${this.endpoint_url}/issues/delete/${id}`);
  }
}
