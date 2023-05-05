import { inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { actions, getSingleUserLoaded, getUsersLoaded } from '../store';
import { catchError, combineLatest, filter, map, of, take, tap } from 'rxjs';
import { CanActivateFn } from '@angular/router';

export const CanActivateSingleUserLoaderFn: CanActivateFn = (route) => {
  const store = inject(Store);
  const id = route.params['id'];

  return combineLatest([
    store.select(getUsersLoaded),
    store.select(getSingleUserLoaded),
  ]).pipe(
    tap(([loadedUsers, loadedUser]) => {
      if (!loadedUsers && !loadedUser) {
        store.dispatch(actions.loadSingleUser({ payload: { userId: id } }));
        store.dispatch(actions.loadUsers({ payload: { page: 1 } }));
      }
    }),
    filter(([loadedUsers, loadedUser]) => loadedUser && loadedUsers),
    map(([loadedUsers, loadedUser]) => loadedUser && loadedUsers),
    take(1),
    catchError(() => of(false))
  );
};
