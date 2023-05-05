import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { actions, getSingleUserLoading } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'new-user-container',
  templateUrl: './new-user-container.component.html',
  styleUrls: ['./new-user-container.component.scss'],
})
export class NewUserContainerComponent implements OnInit {
  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    avatar: '',
    email: '',
  };
  loading$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(getSingleUserLoading);
  }

  onCreate(user: User) {
    this.store.dispatch(actions.createUser({ payload: user }));
  }
}
