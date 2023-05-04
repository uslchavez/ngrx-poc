import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UsersApiService } from '../../services/users-api.service';
import { actions } from '../actions';
import { map, switchMap } from 'rxjs';

@Injectable()
export class UsersEffect {
  constructor(private actions$: Actions, private usersApi: UsersApiService) {}

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
}
