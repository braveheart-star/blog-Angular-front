import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../store/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  private authUrl = 'http://localhost:4000/api/auth';

  handleOnSingup(payload: Credentials) {
    return this.http.post(this.authUrl + '/register', payload);
  }

  handleOnLogin(payload: Credentials) {
    return this.http.post(this.authUrl + '/login', payload);
  }
}
