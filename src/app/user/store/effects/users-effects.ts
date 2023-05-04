import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UsersApiService } from '../../services/users-api.service';
import { actions } from '../actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private usersApi: UsersApiService
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadUsers),
      map((action) => action.payload),
      switchMap((payload) =>
        this.usersApi
          .getUsers(payload.page)
          .pipe(
            map((response) => actions.loadUsersSuccess({ payload: response }))
          )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.loadSingleUser),
      map((action) => action.payload),
      switchMap((payload) =>
        this.usersApi.getUser(payload.userId).pipe(
          map((response) =>
            actions.loadSingleUserSuccess({ payload: response })
          ),
          catchError(() => of(actions.loadSingleUserNotFound()))
        )
      )
    )
  );

  userNotFound$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loadSingleUserNotFound),
        tap(() => this.router.navigate(['users']))
      ),
    { dispatch: false }
  );
}
