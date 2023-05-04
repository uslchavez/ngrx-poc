import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListContainerComponent } from './container/user-list-container.component';
import { CanActivateUsersLoaderFn } from './guards/users.guard';

const routes: Routes = [
  {
    path: '',
    component: UserListContainerComponent,
    canActivate: [CanActivateUsersLoaderFn],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
