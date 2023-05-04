import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDTO, LoginResponse, RegisterResponse } from '../model';

@Injectable()
export class AuthApiService {
  private baseURL = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  registerUser(user: LoginDTO) {
    return this.http.post<RegisterResponse>(`${this.baseURL}/register`, user);
  }

  loginUser(user: LoginDTO) {
    return this.http.post<LoginResponse>(`${this.baseURL}/login`, user);
  }
}
