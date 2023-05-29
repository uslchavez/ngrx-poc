import { UserStore } from '../../models';
import {
  getSingleUser,
  getSingleUserLoaded,
  getSingleUserLoading,
  getSingleUserState,
} from './single-user-selectors';

const store: { users: UserStore } = {
  users: {
    list: {
      entities: [],
      loaded: false,
      loading: false,
    },
    single: {
      loaded: true,
      loading: false,
      user: {
        avatar: 'my-avatar.jpg',
        email: 'mymail@mail.com',
        first_name: 'Lorem',
        last_name: 'Ipsum',
        id: 2,
      },
    },
  },
};

describe('Single user selectors', () => {
  it('should return single state after calling getSingleUserState', () => {
    expect(getSingleUserState(store)).toBe(store.users.single);
  });
  it('should return single user after calling getSingleUser', () => {
    expect(getSingleUser(store)?.avatar).toBe(store.users.single.user?.avatar);
    expect(getSingleUser(store)?.email).toBe(store.users.single.user?.email);
    expect(getSingleUser(store)?.first_name).toBe(
      store.users.single.user?.first_name
    );
    expect(getSingleUser(store)?.last_name).toBe(
      store.users.single.user?.last_name
    );
    expect(getSingleUser(store)?.id).toBe(store.users.single.user?.id);
  });

  it('should return if single user is loaded after calling getSingleUserLoaded', () => {
    expect(getSingleUserLoaded(store)).toBeTrue();
  });

  it('should return if single user is loading after calling getSingleUserLoading', () => {
    expect(getSingleUserLoading(store)).toBeFalse();
  });
});
