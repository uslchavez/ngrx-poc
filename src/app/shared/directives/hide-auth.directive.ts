import { Directive, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthLocalStorageService } from 'src/app/auth/service/auth-localstorage.service';
import { AuthDisplayBase } from './auth-display-base.directive';

@Directive({
  selector: '[hideIfAuthenticated]',
})
export class HideAuthenticatedDirective extends AuthDisplayBase {
  constructor(
    el: ElementRef,
    router: Router,
    private authLocalStorage: AuthLocalStorageService
  ) {
    super(el, router);
  }

  handleVisibility() {
    if (this.authLocalStorage.isTokenAvailable()) {
      this.hide();
    } else {
      this.show();
    }
  }
}
