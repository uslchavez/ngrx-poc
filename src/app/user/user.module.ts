import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersApiService } from './services/users-api.service';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    UserRoutingModule,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [UsersApiService],
})
export class UserModule {}
