import { Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '../../models';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  @Input() user!: User;
  @Output() delete = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();

  onDelete(user: User) {
    this.delete.emit(user);
  }

  onUpdate(user: User) {
    this.update.emit(user);
  }
}
