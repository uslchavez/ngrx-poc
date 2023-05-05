import { createReducer, on } from '@ngrx/store';

import { AuthState } from '../../model/auth-state.model';
import { actions } from '../actions/auth.actions';

export const initialState: AuthState = {
  loading: false,
  token: '',
  error: '',
};

export const authReducer = createReducer(
  initialState,
  on(actions.loginUser, actions.registerUser, (state) => {
    return {
      ...state,
      loading: true,
      error: '',
      token: '',
    };
  }),
  on(actions.loginUserSuccess, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      token: payload.token,
    };
  }),
  on(actions.loginUserFailure, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      error: payload.error,
    };
  })
);
