import { NgModule } from '@angular/core';

import { HideAuthenticatedDirective } from './directives/hide-auth.directive';
import { ShowAuthenticatedDirective } from './directives/show-auth.directive';

@NgModule({
  declarations: [HideAuthenticatedDirective, ShowAuthenticatedDirective],
  exports: [HideAuthenticatedDirective, ShowAuthenticatedDirective],
})
export class SharedModule {}
