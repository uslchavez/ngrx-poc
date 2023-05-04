export type ListUsers = {
  loaded: boolean;
  loading: boolean;
  entities: { [id: number]: User };
};

export type SingleUser = {
  loaded: boolean;
  loading: boolean;
  user?: User;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type ListUserResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
  support?: {
    url: string;
    text: string;
  };
};

export type SingleUserResponse = {
  data: User;
  support?: {
    url: string;
    text: string;
  };
};
