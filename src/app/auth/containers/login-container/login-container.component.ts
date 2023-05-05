import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, Subject, takeUntil } from 'rxjs';

import {
  getError,
  getLoading,
  getToken,
  actions as authActions,
  getAuthState,
} from '../../store';
import { LoginDTO } from '../../model';
import { AuthState } from '../../model/auth-state.model';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent implements OnInit {
  error$!: Observable<string>;
  token$!: Observable<string>;
  loading$!: Observable<boolean>;
  private notifier = new Subject();
  title = '';

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.error$ = this.store.select(getError);
    this.token$ = this.store.select(getToken);
    this.loading$ = this.store.select(getLoading);

    this.route.params.pipe(takeUntil(this.notifier)).subscribe((params) => {
      this.title =
        params['page'] === 'register' ? 'Sign Up Page' : 'Sign In Page';
    });
  }

  onLogin(loginDto: LoginDTO) {
    this.store.dispatch(authActions.loginUser({ payload: loginDto }));
  }

  onRegister(loginDto: LoginDTO) {
    this.store.dispatch(authActions.registerUser({ payload: loginDto }));
  }
}
