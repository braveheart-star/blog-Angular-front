import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  private authUrl = 'http://localhost:4000/api/auth';

  // handleOnSingup(user:User) {
  //   return this.http.get(this.authUrl + '/signup');
  // }
}
