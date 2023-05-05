import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from '../../models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user!: User;
  @Input() loading = false;
  @Output() delete = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();
  @Output() create = new EventEmitter<User>();
  data: User = {
    email: '',
    first_name: '',
    last_name: '',
    avatar: '',
    id: 0,
  };

  ngOnInit(): void {
    if (this.user) {
      this.data.first_name = this.user.first_name;
      this.data.last_name = this.user.last_name;
      this.data.email = this.user.email;
    }
  }

  onDelete(form: NgForm) {
    this.delete.emit({ ...form.value, id: this.user.id });
  }

  onUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({ ...form.value, id: this.user.id });
    }
  }

  onCreate(form: NgForm) {
    if (form.valid) {
      this.create.emit(form.value);
    }
  }
}
