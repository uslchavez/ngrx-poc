import { inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { actions, getSingleUserLoaded } from '../store';
import { catchError, filter, of, take, tap } from 'rxjs';
import { CanActivateFn } from '@angular/router';

export const CanActivateSingleUserLoaderFn: CanActivateFn = (route) => {
  const store = inject(Store);
  const id = route.params['id'];
  return store.select(getSingleUserLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(actions.loadSingleUser({ payload: { userId: id } }));
      }
    }),
    filter((loaded) => loaded),
    take(1),
    catchError(() => of(false))
  );
};
