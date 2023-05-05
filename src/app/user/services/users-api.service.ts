import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ListUserResponse, SingleUserResponse, User } from '../models';

@Injectable()
export class UsersApiService {
  private baseURL = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers(page = 1) {
    return this.http.get<ListUserResponse>(`${this.baseURL}/users`, {
      params: { page },
    });
  }

  getUser(id: number) {
    return this.http.get<SingleUserResponse>(`${this.baseURL}/users/${id}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseURL}/users/${id}`);
  }

  updateUser(user: User) {
    return this.http.put(`${this.baseURL}/users/${user.id}`, user);
  }

  createUser(user: User) {
    return this.http.post(`${this.baseURL}/users`, user);
  }
}
