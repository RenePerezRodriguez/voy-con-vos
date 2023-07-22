import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient){
    this.myAppUrl= environment.endpoint;
    this.myApiUrl= 'api/users'
  }

  getUsers(): Observable<any> {

    //const token= localStorage.getItem('token')
    //const headers = new  HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteUser(ci: string): Observable<any> {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/` + ci);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user);
  }
  getUserID(id: string): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/` + id);
  }
  updateUserID(id: string, user: User): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/` + id, user);
  }
}
