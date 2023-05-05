import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User } from '../../models';
import {
  actions,
  getSingleUser,
  getSingleUserLoaded,
  getSingleUserLoading,
} from '../../store';

@Component({
  selector: 'user-details-container',
  templateUrl: './user-details-container.component.html',
  styleUrls: ['./user-details-container.component.scss'],
})
export class UserDetailsContainerComponent {
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  user$!: Observable<User | undefined>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loaded$ = this.store.select(getSingleUserLoaded);
    this.loading$ = this.store.select(getSingleUserLoading);
    this.user$ = this.store.select(getSingleUser);
  }

  onUpdate(user: User) {
    this.store.dispatch(actions.updateUser({ payload: user }));
  }

  onDelete(user: User) {
    this.store.dispatch(actions.deleteUser({ payload: user }));
  }

  onCreate(user: User) {
    this.store.dispatch(actions.createUser({ payload: user }));
  }
}
