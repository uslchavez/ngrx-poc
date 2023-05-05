import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserRoutingModule } from './user-routing.module';
import { UsersApiService } from './services/users-api.service';
import { effects, reducers } from './store';
import { UserMaterialModule } from './user-material.module';
import { UserListContainerComponent } from './container/user-list-container/user-list-container.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsContainerComponent } from './container/user-details-container/user-details-container.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from '@angular/material/form-field';
import { NewUserContainerComponent } from './container/new-user-container/new-user-container.component';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

@NgModule({
  declarations: [
    UserListContainerComponent,
    UserListComponent,
    UserDetailsContainerComponent,
    UserDetailsComponent,
    NewUserContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UserRoutingModule,
    UserMaterialModule,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
    UsersApiService,
  ],
})
export class UserModule {}
