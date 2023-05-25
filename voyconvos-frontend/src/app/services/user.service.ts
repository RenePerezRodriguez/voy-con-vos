import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Usuario } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url = 'http://localhost:4000/api/users/';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {

    const token= localStorage.getItem('token')
    const headers = new  HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(this.url, { headers: headers});
  }

  deleteUser(ci: string): Observable<any> {
    
    return this.http.delete(this.url + ci);
  }

  addUser(user: User): Observable<any> {
    const token= localStorage.getItem('token')
    const headers = new  HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(this.url, user, { headers: headers});
  }
  getUserID(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }
  updateUserID(id: string, user: User): Observable<any> {
    const token= localStorage.getItem('token')
    const headers = new  HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.put(this.url + id, user, { headers: headers});
  }
  login(usuario: Usuario): Observable<string> {
    return this.http.post<string>(`${this.url}login`, usuario)
   }
}
