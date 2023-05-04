import { createReducer, on } from '@ngrx/store';
import { ListUserResponse, ListUsers } from '../../models';
import { actions } from '../actions';

export const initalState: ListUsers = {
  entities: {},
  loaded: false,
  loading: false,
};

export const reducer = createReducer(
  initalState,
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
  })
);
