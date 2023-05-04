import { createSelector } from '@ngrx/store';
import { getUsers } from '../reducers';

export const getSingleUserState = createSelector(
  getUsers,
  (store) => store.single
);
export const getSingleUserLoaded = createSelector(
  getSingleUserState,
  (singleState) => singleState.loaded
);
export const getSingleUserLoading = createSelector(
  getSingleUserState,
  (singleState) => singleState.loading
);
export const getSingleUser = createSelector(
  getSingleUserState,
  (singleState) => singleState.user
);
