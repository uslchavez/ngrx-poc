import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from '../../model/auth-state.model';

export const getAuthState = createFeatureSelector<AuthState>('auth');

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
