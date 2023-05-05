import { createReducer, on } from '@ngrx/store';

import { actions } from '../actions';
import { SingleUser } from '../../models';

export const singleInitialState: SingleUser = {
  loaded: false,
  loading: false,
  user: undefined,
};

export const singleUserReducer = createReducer(
  singleInitialState,
  on(actions.loadSingleUser, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
    };
  }),
  on(actions.loadSingleUserSuccess, (state, { payload }) => {
    return {
      ...state,
      user: payload.data,
      loading: true,
      loaded: true,
    };
  }),
  on(actions.createUser, (state) => {
    return {
      ...state,
      loading: true,
    };
  })
);
