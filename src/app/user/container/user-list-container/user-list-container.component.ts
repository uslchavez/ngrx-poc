import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User } from '../../models';
import { getUsersList, getUsersLoaded, getUsersLoading } from '../../store';
import { routerActions } from 'src/app/store';

@Component({
  selector: 'user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss'],
})
export class UserListContainerComponent implements OnInit {
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  userList$!: Observable<User[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loaded$ = this.store.select(getUsersLoaded);
    this.loading$ = this.store.select(getUsersLoading);
    this.userList$ = this.store.select(getUsersList);
  }

  onItemClicked(user: User) {
    this.store.dispatch(routerActions.go({ payload: ['users', `${user.id}`] }));
  }
}
