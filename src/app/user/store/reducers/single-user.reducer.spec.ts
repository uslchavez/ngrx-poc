import { SingleUser, User } from '../../models';
import { actions } from '../actions';
import { singleInitialState, singleUserReducer } from './single-user.reducer';

const user: User = {
  avatar: 'my-avatar',
  email: 'mymail@mail.com',
  first_name: 'name',
  id: 0,
  last_name: 'last name',
};

describe('single user reducer', () => {
  let initialState: SingleUser;

  beforeEach(() => {
    initialState = { ...singleInitialState };
  });

  it('should change loading and loaded on loadSingleUser', () => {
    const state = singleUserReducer(
      initialState,
      actions.loadSingleUser({ payload: { userId: 1 } })
    );

    expect(state.loaded).toBeFalse();
    expect(state.loading).toBeTrue();
  });

  it('should add user on loadSingleUserSuccess', () => {
    const state = singleUserReducer(
      initialState,
      actions.loadSingleUserSuccess({ payload: { data: user } })
    );

    expect(state.user).toEqual(user);
    expect(state.loaded).toBeTrue();
    expect(state.loading).toBeFalse();
  });

  it('should change loading on createUser', () => {
    const state = singleUserReducer(
      initialState,
      actions.createUser({ payload: user })
    );

    expect(state.loading).toBeTrue();
  });

  it('should change loading on deleteUser', () => {
    const state = singleUserReducer(
      initialState,
      actions.deleteUser({ payload: user })
    );

    expect(state.loading).toBeTrue();
  });

  it('should change loading on updateUser', () => {
    const state = singleUserReducer(
      initialState,
      actions.updateUser({ payload: user })
    );

    expect(state.loading).toBeTrue();
  });

  it('should stop loading on createUserSuccess', () => {
    const state = singleUserReducer(
      initialState,
      actions.createUserSuccess({ payload: user })
    );

    expect(state.loading).toBeFalse();
  });

  it('should stop loading on updateUserSuccess', () => {
    const state = singleUserReducer(
      initialState,
      actions.updateUserSuccess({ payload: user })
    );

    expect(state.loading).toBeFalse();
  });

  it('should stop loading on deleteUserSuccess', () => {
    const state = singleUserReducer(
      initialState,
      actions.deleteUserSuccess({ payload: user })
    );

    expect(state.loading).toBeFalse();
  });
});
