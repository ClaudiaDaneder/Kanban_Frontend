import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  private baseURL = environment.baseURL

  loadUsers() {
    let url = this.baseURL + 'userlist/';
    return lastValueFrom(this.http.get(url))
  }

  getUserData() {
    let url = this.baseURL + 'profile/';
    return lastValueFrom(this.http.get(url))
  }
}
