import { AuthLocalStorageService } from './auth-localstorage.service';

describe('AuthLocalStorageService', () => {
  let service: AuthLocalStorageService;

  beforeEach(() => {
    service = new AuthLocalStorageService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call localstorage setItem method calling saveToken()', () => {
    const lsSpy = spyOn(localStorage, 'setItem');

    service.saveToken('mytoken');

    expect(lsSpy).toHaveBeenCalledOnceWith('AUTH_TOKEN', 'mytoken');
  });

  it('should call localstorage removeItem method calling clearToken()', () => {
    const lsSpy = spyOn(localStorage, 'removeItem');

    service.clearToken();

    expect(lsSpy).toHaveBeenCalledOnceWith('AUTH_TOKEN');
  });
});
