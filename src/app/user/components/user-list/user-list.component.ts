import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../models';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users!: User[];
  @Output() itemClick = new EventEmitter<User>();

  onItemClick(user: User) {
    this.itemClick.emit(user);
  }
}
