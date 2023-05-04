export type AuthStore = {
  state: AuthState;
};

export type AuthState = {
  token: string;
  loading: boolean;
  error: string;
};
