import { createReducer, on } from '@ngrx/store';

import { actions } from '../actions';
import { SingleUser } from '../../models';

export const singleInitialState: SingleUser = {
  loaded: false,
  loading: false,
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    avatar: '',
    email: '',
  },
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
      loading: false,
      loaded: true,
    };
  }),
  on(actions.createUser, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(actions.createUserSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(actions.deleteUserSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(actions.updateUserSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(actions.updateUser, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(actions.deleteUser, (state) => {
    return {
      ...state,
      loading: true,
    };
  })
);
