import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';

import { actions } from '../actions/auth.actions';
import { AuthApiService } from '../../service/auth-api.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authApi: AuthApiService) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.registerUser),
      map((action) => action.payload),
      switchMap((payload) => {
        return this.authApi.registerUser(payload).pipe(
          map((response) => actions.registerUserSuccess({ payload: response })),
          catchError((err) => of(actions.registerUserFailure({ payload: err })))
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
          map((response) => actions.loginUserSuccess({ payload: response })),
          catchError((err) => of(actions.loginUserFailure({ payload: err })))
        );
      })
    )
  );
}
