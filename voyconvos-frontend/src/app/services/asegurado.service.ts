import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AseguradoService {

  url = 'http://localhost:4000/api/users/';
  constructor(private http: HttpClient) { }


}
