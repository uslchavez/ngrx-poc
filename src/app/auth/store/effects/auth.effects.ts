import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap, tap } from 'rxjs';

import { actions } from '../actions/auth.actions';
import { AuthApiService } from '../../service/auth-api.service';
import { AuthLocalStorageService } from '../../service/auth-localstorage.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authApi: AuthApiService,
    private authLs: AuthLocalStorageService
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
        tap(() => this.router.navigate(['users']))
      ),
    { dispatch: false }
  );
}
