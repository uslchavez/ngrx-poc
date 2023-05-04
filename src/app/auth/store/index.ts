import { createFeatureSelector } from '@ngrx/store';

import { authReducer } from './reducers/auth.reducer';
import { AuthState } from '../model/auth-state.model';

export * from './actions/auth.actions';
export * from './selectors';

export const reducers = [authReducer];
