import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthLocalStorageService } from './auth/service/auth-localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authLocalStorage: AuthLocalStorageService,
    private router: Router
  ) {}

  logOut() {
    this.authLocalStorage.clearToken();
    this.router.navigate(['auth', 'login']);
  }
}
