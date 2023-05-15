import { Action } from '@ngrx/store';

import { actions } from '../actions/auth.actions';
import { authReducer, initialState } from './auth.reducer';

describe('authReducer', () => {
  it('should return initial state', () => {
    const result = authReducer(undefined, {} as Action);

    expect(result).toBe(initialState);
  });

  it('should change loading if loginUser action', () => {
    const result = authReducer(initialState, actions.loginUser);

    expect(result.loading).toBeTrue();
  });

  it('should change loading and token if loginUserSuccess action', () => {
    const payload = { token: 'mytoken' };
    const result = authReducer(
      initialState,
      actions.loginUserSuccess({ payload })
    );

    expect(result.loading).toBeFalse();
    expect(result.token).toBe(payload.token);
  });

  it('should change loading and error if loginUserFailure action', () => {
    const payload = { error: '401' };
    const result = authReducer(
      initialState,
      actions.loginUserFailure({ payload })
    );

    expect(result.loading).toBeFalse();
    expect(result.error).toBe(payload.error);
  });
});
