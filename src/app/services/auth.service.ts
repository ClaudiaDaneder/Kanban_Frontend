import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) { }

  loginUserPassword(username:string, password:string) {
    const url = environment.baseURL + 'login/';
    const body = {
      "username": username,
      "password": password
    }
    return lastValueFrom(this.http.post(url, body))
  }

  registerUser(user: User) {
    const url = environment.baseURL + 'register/';
    return lastValueFrom(this.http.post(url, user));
  }
}
