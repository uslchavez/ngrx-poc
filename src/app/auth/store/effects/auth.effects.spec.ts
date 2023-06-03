import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of, take, throwError } from 'rxjs';

import { AuthApiService } from '../../service/auth-api.service';
import { AuthLocalStorageService } from '../../service/auth-localstorage.service';
import { actions } from '../actions/auth.actions';
import { AuthEffects } from './auth.effects';
import { MessagesService } from 'src/app/shared/services/messages.service';

describe('Auth Effects', () => {
  let service: AuthApiService;
  let effects: AuthEffects;
  let actions$ = new Observable<Action>();
  let router: Router;
  let messageService: MessagesService;

  let routerSpy: jasmine.Spy;
  let registerSpy: jasmine.Spy;
  let loginSpy: jasmine.Spy;
  let successSpy: jasmine.Spy;
  let failureSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [
        AuthApiService,
        AuthLocalStorageService,
        AuthEffects,
        provideMockActions(() => actions$),
      ],
    });

    service = TestBed.inject(AuthApiService);
    effects = TestBed.inject(AuthEffects);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessagesService);

    registerSpy = spyOn(service, 'registerUser');
    loginSpy = spyOn(service, 'loginUser');
    routerSpy = spyOn(router, 'navigate');
    successSpy = spyOn(messageService, 'success');
    failureSpy = spyOn(messageService, 'failure');
  });

  it('should return RegisterResponse from registerUser action', () => {
    registerSpy.and.returnValue(
      of({
        id: 123,
        token: 'mytoken',
      })
    );

    const expected = cold('--b', {
      b: actions.registerUserSuccess({
        payload: { id: 123, token: 'mytoken' },
      }),
    });

    actions$ = hot('--a', {
      a: actions.registerUser({ payload: { email: '', password: '' } }),
    });

    expect(effects.register$).toBeObservable(expected);
  });

  it('should return RegisterResponseFailure if service fails from registerUser action', () => {
    registerSpy.and.returnValue(cold('--#', {}, '400 error'));

    const expected = cold('----b', {
      b: actions.registerUserFailure({ payload: { error: '400 error' } }),
    });

    actions$ = hot('--a', {
      a: actions.registerUser({
        payload: {
          email: '',
          password: '',
        },
      }),
    });

    expect(effects.register$).toBeObservable(expected);
  });

  it('should return LoginResponse from loginUser action', () => {
    loginSpy.and.returnValue(
      of({
        token: 'mytoken',
      })
    );

    const expected = cold('--b', {
      b: actions.loginUserSuccess({ payload: { token: 'mytoken' } }),
    });

    actions$ = hot('--a', {
      a: actions.loginUser({ payload: { email: '', password: '' } }),
    });

    expect(effects.login$).toBeObservable(expected);
  });

  it('should return LoginResponseFailure if service fails from loginUser action', () => {
    loginSpy.and.returnValue(cold('--#', {}, '404 error'));

    const expected = cold('----b', {
      b: actions.loginUserFailure({ payload: { error: '404 error' } }),
    });

    actions$ = hot('--a', {
      a: actions.loginUser({
        payload: {
          email: '',
          password: '',
        },
      }),
    });

    expect(effects.login$).toBeObservable(expected);
  });

  it('should return navigate to users page from loginUserSuccess action', () => {
    loginSpy.and.returnValue(
      of({
        token: 'mytoken',
      })
    );

    actions$ = of(actions.loginUserSuccess({ payload: { token: 'mytoken' } }));

    effects.authSuccess$.pipe(take(1)).subscribe();

    expect(routerSpy).toHaveBeenCalledWith(['users']);
    expect(successSpy).toHaveBeenCalledWith('Welcome!');
  });

  it('should invoke message service failure from loginUserFailure or registerUserFailure action', () => {
    actions$ = of(actions.loginUserFailure({ payload: { error: '' } }));

    effects.authFail$.pipe(take(1)).subscribe();

    expect(failureSpy).toHaveBeenCalledWith(
      'Invalid credentials try with other email or password'
    );
  });
});
