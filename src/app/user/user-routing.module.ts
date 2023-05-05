import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListContainerComponent } from './container/user-list-container/user-list-container.component';
import {
  CanActivateSingleUserLoaderFn,
  CanActivateUsersLoaderFn,
} from './guards';
import { UserDetailsContainerComponent } from './container/user-details-container/user-details-container.component';
import { NewUserContainerComponent } from './container/new-user-container/new-user-container.component';

const routes: Routes = [
  {
    path: '',
    component: UserListContainerComponent,
    canActivate: [CanActivateUsersLoaderFn],
  },
  {
    path: 'add',
    component: NewUserContainerComponent,
    canActivate: [CanActivateUsersLoaderFn],
  },
  {
    path: ':id',
    component: UserDetailsContainerComponent,
    canActivate: [CanActivateSingleUserLoaderFn],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
