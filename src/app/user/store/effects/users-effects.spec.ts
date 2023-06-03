import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { Observable, of, take } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { UsersApiService } from '../../services/users-api.service';
import { UsersEffect } from './users-effects';
import { actions } from '../actions';
import { routerActions } from '../../../store/actions';
import { ListUserResponse, SingleUserResponse } from '../../models';
import { MessagesService } from 'src/app/shared/services/messages.service';

describe('users effects', () => {
  let service: UsersApiService;
  let effects: UsersEffect;
  let actions$ = new Observable<Action>();
  let router: Router;
  let messages: MessagesService;

  let createUserSpy: jasmine.Spy;
  let updateUserSpy: jasmine.Spy;
  let deleteUserSpy: jasmine.Spy;
  let getUsersSpy: jasmine.Spy;
  let getUserSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;
  let successSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        UsersApiService,
        UsersEffect,
        provideMockActions(() => actions$),
        MatSnackBar,
        BrowserAnimationsModule,
      ],
    });

    service = TestBed.inject(UsersApiService);
    effects = TestBed.inject(UsersEffect);
    router = TestBed.inject(Router);
    messages = TestBed.inject(MessagesService);

    createUserSpy = spyOn(service, 'createUser');
    updateUserSpy = spyOn(service, 'updateUser');
    deleteUserSpy = spyOn(service, 'deleteUser');
    getUsersSpy = spyOn(service, 'getUsers');
    getUserSpy = spyOn(service, 'getUser');
    navigateSpy = spyOn(router, 'navigate');
    successSpy = spyOn(messages, 'success');
  });

  it('should return User from createUser action', () => {
    const response = {
      name: 'morpheus',
      job: 'leader',
      id: '146',
      createdAt: '2023-05-29T13:04:46.714Z',
    };
    createUserSpy.and.returnValue(of(response));

    const expected = cold('--b', {
      b: actions.createUserSuccess({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 0,
        },
      }),
    });

    actions$ = hot('--a', {
      a: actions.createUser({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 0,
        },
      }),
    });

    expect(effects.createUser$).toBeObservable(expected);
  });

  it('should return createUserFailure if service fails from createUser action', () => {
    createUserSpy.and.returnValue(cold('--#', {}, '400 error'));

    const expected = cold('----b', {
      b: actions.createUserFailure(),
    });

    actions$ = hot('--a', {
      a: actions.createUser({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 0,
        },
      }),
    });

    expect(effects.createUser$).toBeObservable(expected);
  });

  it('should return updated User from updateUser action', () => {
    const response = {
      name: 'morpheus',
      job: 'zion resident',
      updatedAt: '2023-05-29T13:11:03.435Z',
    };
    updateUserSpy.and.returnValue(of(response));

    const expected = cold('--b', {
      b: actions.updateUserSuccess({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 5,
        },
      }),
    });

    actions$ = hot('--a', {
      a: actions.updateUser({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 5,
        },
      }),
    });

    expect(effects.updateUser$).toBeObservable(expected);
  });

  it('should return updateUserFailure if service fails from updateUser action', () => {
    updateUserSpy.and.returnValue(cold('--#', {}, '400 error'));

    const expected = cold('----b', {
      b: actions.updateUserFailure(),
    });

    actions$ = hot('--a', {
      a: actions.updateUser({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 0,
        },
      }),
    });

    expect(effects.updateUser$).toBeObservable(expected);
  });

  it('should return updated User from updateUser action', () => {
    const response = {
      name: 'morpheus',
      job: 'zion resident',
      updatedAt: '2023-05-29T13:11:03.435Z',
    };
    updateUserSpy.and.returnValue(of(response));

    const expected = cold('--b', {
      b: actions.updateUserSuccess({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 5,
        },
      }),
    });

    actions$ = hot('--a', {
      a: actions.updateUser({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 5,
        },
      }),
    });

    expect(effects.updateUser$).toBeObservable(expected);
  });

  it('should dispatch deleteUserSuccess action from deleteUser action', () => {
    deleteUserSpy.and.returnValue(of({}));

    const expected = cold('--b', {
      b: actions.deleteUserSuccess({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 5,
        },
      }),
    });

    actions$ = hot('--a', {
      a: actions.deleteUser({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 5,
        },
      }),
    });

    expect(effects.deleteUser$).toBeObservable(expected);
  });

  it('should return deleteUserFailure if service fails from deleteUser action', () => {
    deleteUserSpy.and.returnValue(cold('--#', {}, '400 error'));

    const expected = cold('----b', {
      b: actions.deleteUserFailure(),
    });

    actions$ = hot('--a', {
      a: actions.deleteUser({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 0,
        },
      }),
    });

    expect(effects.deleteUser$).toBeObservable(expected);
  });

  it('should return loadUsersSuccess from loadUsers action', () => {
    const response: ListUserResponse = {
      data: [
        {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 1,
        },
      ],
      page: 1,
      per_page: 1,
      total: 1,
      total_pages: 1,
    };
    getUsersSpy.and.returnValue(of(response));

    const expected = cold('--b', {
      b: actions.loadUsersSuccess({
        payload: response,
      }),
    });

    actions$ = hot('--a', {
      a: actions.loadUsers({ payload: { page: 1 } }),
    });

    expect(effects.getUsers$).toBeObservable(expected);
  });

  it('should return loadSingleUserSuccess from loadSingleUser action', () => {
    const response: SingleUserResponse = {
      data: {
        avatar: 'my-avatar.jpg',
        email: 'mymail@mail.com',
        first_name: 'Morpheus',
        last_name: 'Ipsum',
        id: 1,
      },
    };
    getUserSpy.and.returnValue(of(response));

    const expected = cold('--b', {
      b: actions.loadSingleUserSuccess({
        payload: response,
      }),
    });

    actions$ = hot('--a', {
      a: actions.loadSingleUser({ payload: { userId: 1 } }),
    });

    expect(effects.getUser$).toBeObservable(expected);
  });

  it('should return loadSingleUserSuccess from loadSingleUser action', () => {
    getUserSpy.and.returnValue(cold('--#', {}, '404 error'));

    const expected = cold('----b', {
      b: actions.loadSingleUserNotFound(),
    });

    actions$ = hot('--a', {
      a: actions.loadSingleUser({ payload: { userId: 99 } }),
    });

    expect(effects.getUser$).toBeObservable(expected);
  });

  it('should navigate to users if loadSingleUserNotFound action is triggered', () => {
    actions$ = of(actions.loadSingleUserNotFound());

    effects.userNotFound$.pipe(take(1)).subscribe();

    expect(navigateSpy).toHaveBeenCalledWith(['users']);
  });

  it('should navigate to users if createUserSuccess action is triggered', () => {
    const expected = cold('--b', {
      b: routerActions.go({ payload: ['users'] }),
    });

    actions$ = hot('--a', {
      a: actions.createUserSuccess({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 1,
        },
      }),
    });

    expect(effects.successOperation$).toBeObservable(expected);
  });

  it('should navigate to users if updateUserSuccess action is triggered', () => {
    const expected = cold('--b', {
      b: routerActions.go({ payload: ['users'] }),
    });

    actions$ = hot('--a', {
      a: actions.updateUserSuccess({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 1,
        },
      }),
    });

    expect(effects.successOperation$).toBeObservable(expected);
  });

  it('should navigate to users if deleteUserSuccess action is triggered', () => {
    const expected = cold('--b', {
      b: routerActions.go({ payload: ['users'] }),
    });

    actions$ = hot('--a', {
      a: actions.deleteUserSuccess({
        payload: {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Morpheus',
          last_name: 'Ipsum',
          id: 1,
        },
      }),
    });

    expect(effects.successOperation$).toBeObservable(expected);
  });

  it('should invoke message service success from createUserSuccess action', () => {
    actions$ = of(
      actions.createUserSuccess({
        payload: {
          avatar: '',
          email: '',
          first_name: '',
          id: 1,
          last_name: '',
        },
      })
    );

    effects.creationSuccessful$.pipe(take(1)).subscribe();

    expect(successSpy).toHaveBeenCalledWith('User created successfully');
  });

  it('should invoke message service success from deleteUserSuccess action', () => {
    actions$ = of(
      actions.deleteUserSuccess({
        payload: {
          avatar: '',
          email: '',
          first_name: '',
          id: 1,
          last_name: '',
        },
      })
    );

    effects.deleteSuccessful$.pipe(take(1)).subscribe();

    expect(successSpy).toHaveBeenCalledWith('User deleted successfully');
  });

  it('should invoke message service success from updateUserSuccess action', () => {
    actions$ = of(
      actions.updateUserSuccess({
        payload: {
          avatar: '',
          email: '',
          first_name: '',
          id: 1,
          last_name: '',
        },
      })
    );

    effects.updateSuccessful$.pipe(take(1)).subscribe();

    expect(successSpy).toHaveBeenCalledWith('User updated successfully');
  });
});
