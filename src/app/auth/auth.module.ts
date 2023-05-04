import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthMaterialModule } from './auth-material.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { reducers } from './store';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

@NgModule({
  declarations: [AuthComponent, UserFormComponent, LoginContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    AuthMaterialModule,
    StoreModule.forFeature('auth', reducers),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
  ],
})
export class AuthModule {}
