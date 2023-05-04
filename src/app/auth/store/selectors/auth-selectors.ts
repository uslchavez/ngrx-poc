import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthStore, AuthState } from '../../model';

export const getAuthStore = createFeatureSelector<AuthStore>('auth');
export const getAuthState = createSelector(
  getAuthStore,
  (authStore: AuthStore) => authStore.state
);

export const getError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);
export const getLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading
);
export const getToken = createSelector(
  getAuthState,
  (state: AuthState) => state.token
);
