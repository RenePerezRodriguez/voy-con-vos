import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient){
    this.myAppUrl= environment.endpoint;
    this.myApiUrl= 'api/admin'
  }
  login(admin: Login): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/auth`, admin);
  }
}
