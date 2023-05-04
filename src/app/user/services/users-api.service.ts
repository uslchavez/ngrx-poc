import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListUserResponse } from '../models';

@Injectable()
export class UsersApiService {
  private baseURL = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers(page = 1) {
    return this.http.get<ListUserResponse>(`${this.baseURL}/users`, {
      params: { page },
    });
  }
}
