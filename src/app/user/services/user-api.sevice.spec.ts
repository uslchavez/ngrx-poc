import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  RequestMatch,
} from '@angular/common/http/testing';

import { UsersApiService } from './users-api.service';
import { take } from 'rxjs';
import { ListUserResponse, SingleUserResponse, User } from '../models';

const responseGetAllUsers: ListUserResponse = {
  page: 1,
  per_page: 1,
  total: 1,
  total_pages: 1,
  data: [
    {
      id: 1,
      email: 'test@mail.com',
      first_name: 'Lorem',
      last_name: 'Ipsum',
      avatar: 'avatar',
    },
  ],
  support: {
    url: '',
    text: '',
  },
};
const responseGetUser: SingleUserResponse = {
  data: {
    id: 1,
    avatar: 'avatar',
    email: 'test@mail.com',
    first_name: 'Lorem',
    last_name: 'Ipsum',
  },
};
const requestCreateUser: User = {
  id: 0,
  avatar: 'avatar',
  email: 'test@mail.com',
  first_name: 'Lorem',
  last_name: 'Ipsum',
};

describe('UsersApiService', () => {
  let service: UsersApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersApiService],
    });

    service = TestBed.inject(UsersApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('should do a GET request calling "getUsers" method', (done: DoneFn) => {
    service
      .getUsers()
      .pipe(take(1))
      .subscribe((result) => {
        expect(result).toBe(responseGetAllUsers);
        done();
      });

    const requestMatch: RequestMatch = {
      method: 'GET',
      url: `https://reqres.in/api/users?page=1`,
    };
    const testRequest = httpController.expectOne(
      requestMatch,
      'Get all users in page 1'
    );
    testRequest.flush(responseGetAllUsers, { status: 200, statusText: 'OK' });
    httpController.verify();
  });

  it('should do a GET request calling "getUser" method', (done: DoneFn) => {
    const userId = 1;
    service
      .getUser(userId)
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toBe(responseGetUser);
        done();
      });

    const requestMatch: RequestMatch = {
      method: 'GET',
      url: `https://reqres.in/api/users/${userId}`,
    };
    const testRequest = httpController.expectOne(
      requestMatch,
      'Get user by id'
    );
    testRequest.flush(responseGetUser, { status: 200, statusText: 'OK' });
    httpController.verify();
  });

  it('should do a DELETE request calling "deleteUser" method', (done: DoneFn) => {
    const userId = 1;
    service
      .deleteUser(userId)
      .pipe(take(1))
      .subscribe(() => {
        expect().nothing();
        done();
      });

    const requestMatch: RequestMatch = {
      method: 'DELETE',
      url: `https://reqres.in/api/users/${userId}`,
    };
    const testRequest = httpController.expectOne(
      requestMatch,
      'Delete user by id'
    );
    testRequest.flush(null, { status: 204, statusText: 'No Content' });
    httpController.verify();
  });

  it('should do a POST request calling "createUser" method', (done: DoneFn) => {
    service
      .createUser(requestCreateUser)
      .pipe(take(1))
      .subscribe(() => {
        expect().nothing();
        done();
      });

    const requestMatch: RequestMatch = {
      method: 'POST',
      url: `https://reqres.in/api/users`,
    };
    const testRequest = httpController.expectOne(
      requestMatch,
      'Create new user'
    );
    testRequest.flush(null, { status: 201, statusText: 'Created' });
    httpController.verify();
  });

  it('should do a PUT request calling "updateUser" method', (done: DoneFn) => {
    service
      .updateUser(requestCreateUser)
      .pipe(take(1))
      .subscribe(() => {
        expect().nothing();
        done();
      });

    const requestMatch: RequestMatch = {
      method: 'PUT',
      url: `https://reqres.in/api/users/${requestCreateUser.id}`,
    };
    const testRequest = httpController.expectOne(
      requestMatch,
      'Update existing user'
    );
    testRequest.flush(null, { status: 201, statusText: 'Created' });
    httpController.verify();
  });
});
