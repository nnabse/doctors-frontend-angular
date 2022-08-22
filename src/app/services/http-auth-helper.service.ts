import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthHelperService {
  constructor(private http: HttpClient) {}

  loginUser(body: any): Observable<any> {
    return this.http.post('http://localhost:8000/loginUser', body);
  }

  registerUser(body: any): Observable<any> {
    return this.http.post('http://localhost:8000/createUser', body);
  }
}
