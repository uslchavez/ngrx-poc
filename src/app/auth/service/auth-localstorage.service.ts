import { Injectable } from '@angular/core';

@Injectable()
export class AuthLocalStorageService {
  private readonly TOKEN_KEY = 'AUTH_TOKEN';

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
