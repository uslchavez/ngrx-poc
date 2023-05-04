import { inject } from '@angular/core';

import { Store } from '@ngrx/store';

import { catchError, filter, of, take, tap } from 'rxjs';

import { actions, getUsersLoaded } from '../store';

export const CanActivateUsersLoaderFn = () => {
  const store = inject(Store);
  return store.select(getUsersLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(actions.loadUsers({ payload: { page: 1 } }));
      }
    }),
    filter((loaded) => loaded),
    take(1),
    catchError(() => of(false))
  );
};
