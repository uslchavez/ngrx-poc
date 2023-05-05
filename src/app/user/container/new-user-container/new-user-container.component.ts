import { Component } from '@angular/core';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { actions } from '../../store';

@Component({
  selector: 'new-user-container',
  templateUrl: './new-user-container.component.html',
  styleUrls: ['./new-user-container.component.scss'],
})
export class NewUserContainerComponent {
  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    avatar: '',
    email: '',
  };

  constructor(private store: Store) {}

  onCreate(user: User) {
    this.store.dispatch(actions.createUser({ payload: user }));
  }
}
