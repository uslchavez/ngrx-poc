import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStore } from '../../models';

export const getUsers = createFeatureSelector<UserStore>('users');

export const getUsersListState = createSelector(
  getUsers,
  (store) => store.list
);

export const getUsersEntities = createSelector(
  getUsersListState,
  (state) => state.entities
);
export const getUsersList = createSelector(getUsersEntities, (entities) => {
  return Object.keys(entities).map((id) => entities[parseInt(id, 10)]);
});
export const getUsersLoaded = createSelector(
  getUsersListState,
  (state) => state.loaded
);
export const getUsersLoading = createSelector(
  getUsersListState,
  (state) => state.loading
);
