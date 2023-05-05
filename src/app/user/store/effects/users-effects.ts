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

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteUser),
      map((action) => action.payload),
      switchMap((payload) =>
        this.usersApi.deleteUser(payload.id).pipe(
          map(() => actions.deleteUserSuccess({ payload })),
          catchError(() => of(actions.deleteUserFailure()))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateUser),
      map((action) => action.payload),
      switchMap((payload) =>
        this.usersApi.updateUser(payload).pipe(
          map(() => actions.updateUserSuccess({ payload })),
          catchError(() => of(actions.updateUserFailure()))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createUser),
      map((action) => action.payload),
      switchMap((payload) =>
        this.usersApi.createUser(payload).pipe(
          map(() => actions.createUserSuccess({ payload })),
          catchError(() => of(actions.createUserFailure()))
        )
      )
    )
  );
}
