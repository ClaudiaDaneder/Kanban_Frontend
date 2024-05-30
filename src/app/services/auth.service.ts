import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin: boolean = false;

  constructor(public http: HttpClient) { }

  loginUserPassword(username: string, password: string) {
    let url = environment.baseURL + 'login/';
    let body = {
      "username": username,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body))
  }

  logout() {
    let url = environment.baseURL + 'logout/';
    return lastValueFrom(this.http.get(url));
  }

  registerUser(user: User) {
    let url = environment.baseURL + 'register/';
    return lastValueFrom(this.http.post(url, user));
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == null || !token) {
      this.isLoggedin = false;
      return this.isLoggedin;
    }
    else {
      return true;
    }
  }
}