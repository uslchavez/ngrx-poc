import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthMaterialModule } from './auth-material.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginContainerComponent } from './containers/login-container/login-container.component';
import { AuthApiService } from './service/auth-api.service';
import { effects, reducers } from './store';
import { AuthLocalStorageService } from './service/auth-localstorage.service';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

@NgModule({
  declarations: [AuthComponent, UserFormComponent, LoginContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    AuthMaterialModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
    AuthApiService,
    AuthLocalStorageService,
  ],
})
export class AuthModule {}
