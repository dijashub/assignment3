import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  
  constructor(private httpClient: HttpClient) {
  }

  authenticateUser(data) {
    return this.httpClient.post('http://localhost:3000/auth/v1/', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token) {
    return this.httpClient.post('http://localhost:3000/auth/v1/isAuthenticated', token, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
    }).pipe(
      map(res => res['isAuthenticated'])
    ).toPromise();
  }
}
