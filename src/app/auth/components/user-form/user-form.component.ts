import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { LoginDTO } from '../../model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Output() login = new EventEmitter<LoginDTO>();
  @Output() register = new EventEmitter<LoginDTO>();
  currentPage: string = '';

  private notifier = new Subject();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.notifier)).subscribe((params) => {
      this.currentPage = params['page'];
    });
  }

  ngOnDestroy() {
    this.notifier.complete();
  }

  onLoginClick(form: NgForm) {
    if (form.valid) {
      this.login.emit(form.value);
    }
  }

  onRegisterClick(form: NgForm) {
    if (form.valid) {
      this.register.emit(form.value);
    }
  }
}
