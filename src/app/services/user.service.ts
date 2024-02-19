import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  userUrl = environment.API + '/users';

  constructor() {}

  getUsers() {
    // return this.http.get(`${this.userUrl}/?page=2`);
    return this.http.get(`${this.userUrl}`);
  }
  getSingleUser(id: any) {
    return this.http.get(`${this.userUrl}/${id}`);
  }
  createUser(user: any) {
    return this.http.post(this.userUrl, user);
  }
  updateUser(userID: any, user: any) {
    return this.http.put(`${this.userUrl}/${userID}`,user);
  }
}
