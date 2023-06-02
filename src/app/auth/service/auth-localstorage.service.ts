import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthLocalStorageService {
  private readonly TOKEN_KEY = 'AUTH_TOKEN';

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  clearToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isTokenAvailable() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return token !== null && token !== '';
  }
}
