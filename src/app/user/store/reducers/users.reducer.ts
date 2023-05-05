import { createReducer, on } from '@ngrx/store';
import { ListUsers } from '../../models';
import { actions } from '../actions';

export const listInitialState: ListUsers = {
  entities: {},
  loaded: false,
  loading: false,
};

export const listReducer = createReducer(
  listInitialState,
  on(actions.loadUsers, (state) => {
    return {
      ...state,
      loaded: false,
      loading: true,
    };
  }),
  on(actions.loadUsersSuccess, (state, { payload }) => {
    const entities = payload.data.reduce((entities, user) => {
      const id = user.id;
      return {
        ...entities,
        [id]: user,
      };
    }, state.entities);

    return {
      ...state,
      loading: false,
      loaded: true,
      entities,
    };
  }),
  on(actions.createUserSuccess, (state, { payload }) => {
    return {
      ...state,
      entities: {
        ...state.entities,
        payload,
      },
    };
  }),
  on(actions.updateUserSuccess, (state, { payload }) => {
    const entities = {
      ...state.entities,
      [payload.id]: payload,
    };
    return {
      ...state,
      entities,
    };
  }),
  on(actions.deleteUserSuccess, (state, { payload }) => {
    const { [payload.id]: removed, ...entities } = state.entities;
    return {
      ...state,
      entities,
    };
  })
);
