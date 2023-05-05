import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerActions } from '../actions';
import { map, tap } from 'rxjs';

@Injectable()
export class RouterEffects {
  constructor(private router: Router, private actions$: Actions) {}

  Go$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerActions.go),
        map((action) => action.payload),
        tap((payload) => this.router.navigate(payload))
      ),
    { dispatch: false }
  );
}
