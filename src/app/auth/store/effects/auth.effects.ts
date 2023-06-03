import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap, tap } from 'rxjs';

import { actions } from '../actions/auth.actions';
import { AuthApiService } from '../../service/auth-api.service';
import { AuthLocalStorageService } from '../../service/auth-localstorage.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authApi: AuthApiService,
    private authLs: AuthLocalStorageService,
    private messages: MessagesService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.registerUser),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.authApi.registerUser(payload).pipe(
          tap((response) => this.authLs.saveToken(response.token)),
          map((response) => actions.registerUserSuccess({ payload: response })),
          catchError((err) => {
            this.authLs.clearToken();
            return of(actions.registerUserFailure({ payload: { error: err } }));
          })
        );
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loginUser),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.authApi.loginUser(payload).pipe(
          tap((response) => this.authLs.saveToken(response.token)),
          map((response) => actions.loginUserSuccess({ payload: response })),
          catchError((err) => {
            this.authLs.clearToken();
            return of(actions.loginUserFailure({ payload: { error: err } }));
          })
        );
      })
    )
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loginUserSuccess, actions.registerUserSuccess),
        tap(() => this.messages.success('Welcome!')),
        tap(() => this.router.navigate(['users']))
      ),
    { dispatch: false }
  );

  authFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loginUserFailure, actions.registerUserFailure),
        tap(() =>
          this.messages.failure(
            'Invalid credentials try with other email or password'
          )
        )
      ),
    { dispatch: false }
  );
}
