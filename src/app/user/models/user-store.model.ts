import { ListUsers, SingleUser } from './user-response.model';

export type UserStore = {
  list: ListUsers;
  single: SingleUser;
};
