import { createFeatureSelector } from '@ngrx/store';

import { authReducer } from './reducers/auth.reducer';
import { AuthState } from '../model/auth-state.model';

export * from './actions/auth.actions';

export const reducers = [authReducer];

export const getAuthState = createFeatureSelector<AuthState>('auth');
