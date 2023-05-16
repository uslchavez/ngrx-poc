import {
  getAuthState,
  getAuthStore,
  getError,
  getLoading,
  getToken,
} from './auth-selectors';

const store = {
  auth: {
    state: {
      token: 'mytoken',
      error: '500 error',
      loading: true,
    },
  },
};

describe('Auth selectors', () => {
  it('should return auth store after calling getAuthStore', () => {
    expect(getAuthStore(store).state).toBeDefined();
  });

  it('should return state section after calling getAuthState', () => {
    const result = getAuthState(store);
    expect(result.error).toBeDefined();
    expect(result.loading).toBeDefined();
    expect(result.token).toBeDefined();
  });

  it('should return error property after calling getError', () => {
    const error = getError(store);
    expect(error).toEqual('500 error');
  });

  it('should return loading property after calling getLoading', () => {
    const loading = getLoading(store);
    expect(loading).toBeTrue();
  });

  it('should return token property after calling getToken', () => {
    const token = getToken(store);
    expect(token).toEqual('mytoken');
  });
});
