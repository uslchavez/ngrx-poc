import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  RequestMatch,
} from '@angular/common/http/testing';

import { LoginDTO, LoginResponse, RegisterResponse } from '../model';
import { AuthApiService } from './auth-api.service';
import { take } from 'rxjs';

const authRequest: LoginDTO = {
  password: '123qwe',
  email: 'user01',
};

const registrationResponse: RegisterResponse = {
  id: 1,
  token: 'testtoken',
};

const loginResponse: LoginResponse = {
  token: 'testtoken',
};

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthApiService],
    });
    httpController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthApiService);
  });

  it('should do a POST request calling "registerUser" method', () => {
    let testRequest;
    const requestMatch: RequestMatch = {
      method: 'POST',
      url: 'https://reqres.in/api/register',
    };

    service
      .registerUser(authRequest)
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toBe(registrationResponse);
      });

    testRequest = httpController.expectOne(
      requestMatch,
      'Register user endpoint'
    );
    testRequest.flush(registrationResponse, { status: 200, statusText: 'OK' });
    httpController.verify();
  });

  it('should do a POST request calling "loginUser" method', () => {
    let testRequest;
    const requestMatch: RequestMatch = {
      method: 'POST',
      url: 'https://reqres.in/api/login',
    };

    service
      .loginUser(authRequest)
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toBe(loginResponse);
      });

    testRequest = httpController.expectOne(requestMatch, 'Login user endpoint');
    testRequest.flush(loginResponse, { status: 200, statusText: 'OK' });
    httpController.verify();
  });
});
