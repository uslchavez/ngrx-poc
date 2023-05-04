import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UsersApiService } from './services/users-api.service';
import { effects, reducers } from './store';
import { UserMaterialModule } from './user-material.module';
import { UserListContainerComponent } from './container/user-list-container.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [UserComponent, UserListContainerComponent, UserListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    UserRoutingModule,
    UserMaterialModule,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [UsersApiService],
})
export class UserModule {}
