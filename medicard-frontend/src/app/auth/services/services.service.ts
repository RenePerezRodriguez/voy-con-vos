import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/interfaces/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }
  
  Login(email: string, password: string){
    const body = {
      email,
      password
    }
    return this.http.post<AuthResponse>('http://localhost:5050/api/auth/login', body)
  }
}
