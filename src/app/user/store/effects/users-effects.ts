import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap, tap } from 'rxjs';

import { routerActions } from 'src/app/store';
import { UsersApiService } from '../../services/users-api.service';
import { actions } from '../actions';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Injectable()
export class UsersEffect {
  constructor(
    private router: Router,
    private actions$: Actions,
    private usersApi: UsersApiService,
    private message: MessagesService
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

  successOperation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        actions.createUserSuccess,
        actions.deleteUserSuccess,
        actions.updateUserSuccess
      ),
      switchMap(() => of(routerActions.go({ payload: ['users'] })))
    )
  );

  creationSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.createUserSuccess),
        tap(() => this.message.success('User created successfully'))
      ),
    { dispatch: false }
  );

  deleteSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.deleteUserSuccess),
        tap(() => this.message.success('User deleted successfully'))
      ),
    { dispatch: false }
  );

  updateSuccessful$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.updateUserSuccess),
        tap(() => this.message.success('User updated successfully'))
      ),
    { dispatch: false }
  );
}
