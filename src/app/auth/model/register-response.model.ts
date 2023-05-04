export type RegisterResponse = {
  id: number;
  token: string;
};

export type RegisterResponseFailure = {
  error: string;
};
