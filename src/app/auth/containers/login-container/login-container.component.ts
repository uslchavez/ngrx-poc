import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.error$ = this.store.select(getError);
    this.token$ = this.store.select(getToken);
    this.loading$ = this.store.select(getLoading);
  }

  onLogin(loginDto: LoginDTO) {
    this.store.dispatch(authActions.loginUser({ payload: loginDto }));
  }

  onRegister(loginDto: LoginDTO) {
    this.store.dispatch(authActions.registerUser({ payload: loginDto }));
  }
}
