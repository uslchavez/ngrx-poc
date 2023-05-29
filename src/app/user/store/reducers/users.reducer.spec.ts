import { listReducer, listInitialState } from './users.reducer';
import { actions } from '../actions';
import { ListUsers, User } from '../../models';

const user: User = {
  avatar: 'my-avatar.jpg',
  email: 'mymail@mail.com',
  first_name: 'Lorem',
  last_name: 'Ipsum',
  id: 2,
};

describe('users reducer', () => {
  let initialState: ListUsers;
  beforeEach(() => {
    initialState = { ...listInitialState };
  });
  it('should change loaded and loading on loadUsers action', () => {
    const state = listReducer(
      initialState,
      actions.loadUsers({ payload: { page: 1 } })
    );

    expect(state.loaded).toBeFalse();
    expect(state.loading).toBeTrue();
  });

  it('should update entities on loadUsersSuccess action', () => {
    const state = listReducer(
      initialState,
      actions.loadUsersSuccess({
        payload: {
          data: [user],
          page: 1,
          per_page: 1,
          total: 1,
          total_pages: 1,
        },
      })
    );

    expect(state.entities).toEqual({
      [user.id]: user,
    });
    expect(state.loaded).toBeTrue();
    expect(state.loading).toBeFalse();
  });

  it('should add new entity on createUserSuccess action', () => {
    const state = listReducer(
      initialState,
      actions.createUserSuccess({ payload: user })
    );

    const stateUser = Object.keys(state.entities).map(
      (key) => state.entities[Number(key)]
    );

    expect(stateUser[0].avatar).toBe(
      `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
    );
    expect(stateUser[0].last_name).toBe(user.last_name);
    expect(stateUser[0].first_name).toBe(user.first_name);
    expect(stateUser[0].email).toBe(user.email);
    expect(stateUser[0].id).toBeGreaterThan(0);
  });

  it('should update existing user on updateUserSuccess action', () => {
    initialState.entities = {
      '10': {
        avatar: '',
        email: '',
        first_name: '',
        id: 10,
        last_name: '',
      },
    };
    const updatedUser = {
      avatar: '',
      email: 'new-email',
      first_name: 'new name',
      id: 10,
      last_name: 'new last name',
    };
    const state = listReducer(
      initialState,
      actions.updateUserSuccess({ payload: updatedUser })
    );

    expect(state.entities[10].last_name).toEqual(updatedUser.last_name);
    expect(state.entities[10].first_name).toEqual(updatedUser.first_name);
    expect(state.entities[10].email).toEqual(updatedUser.email);
  });

  it('should remove entitiy on deleteUserSuccess action', () => {
    initialState.entities = {
      '10': {
        avatar: '',
        email: '',
        first_name: '',
        id: 10,
        last_name: '',
      },
    };

    expect(Object.keys(initialState.entities).length).toBe(1);

    const state = listReducer(
      initialState,
      actions.deleteUserSuccess({
        payload: {
          avatar: '',
          email: '',
          first_name: '',
          id: 10,
          last_name: '',
        },
      })
    );

    expect(Object.keys(state.entities).length).toBe(0);
  });
});
