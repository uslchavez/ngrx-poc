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
    };
  }),
  on(actions.loadSingleUserSuccess, (state) => {
    return {
      ...state,
      loading: true,
      loaded: true,
    };
  })
);
