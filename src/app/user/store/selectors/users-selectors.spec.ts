import { UserStore } from '../../models';
import {
  getUsersEntities,
  getUsersList,
  getUsersListState,
  getUsersLoaded,
  getUsersLoading,
} from './users-selectors';

const store: { users: UserStore } = {
  users: {
    list: {
      entities: {
        '2': {
          avatar: 'my-avatar.jpg',
          email: 'mymail@mail.com',
          first_name: 'Lorem',
          last_name: 'Ipsum',
          id: 2,
        },
      },
      loaded: true,
      loading: false,
    },
    single: {
      loaded: false,
      loading: false,
      user: {
        avatar: '',
        email: '',
        first_name: '',
        last_name: '',
        id: 0,
      },
    },
  },
};
const userList = [
  {
    avatar: 'my-avatar.jpg',
    email: 'mymail@mail.com',
    first_name: 'Lorem',
    last_name: 'Ipsum',
    id: 2,
  },
];

describe('User list selectors', () => {
  it('should return list state after calling getUsersListState', () => {
    expect(getUsersListState(store)).toBe(store.users.list);
  });
  it('should return user list after calling getUsersList', () => {
    expect(getUsersList(store)).toEqual(userList);
    expect(getUsersList(store).length).toEqual(1);
  });
  it('should return user entities after calling getUsersEntities', () => {
    expect(getUsersEntities(store)[2].avatar).toEqual('my-avatar.jpg');
    expect(getUsersEntities(store)[2].first_name).toEqual('Lorem');
    expect(getUsersEntities(store)[2].last_name).toEqual('Ipsum');
    expect(getUsersEntities(store)[2].id).toEqual(2);
    expect(getUsersEntities(store)[2].email).toEqual('mymail@mail.com');
  });

  it('should return if list user is loaded after calling getUsersLoaded', () => {
    expect(getUsersLoaded(store)).toBeTrue();
  });

  it('should return if list user is loading after calling getUsersLoading', () => {
    expect(getUsersLoading(store)).toBeFalse();
  });
});
