import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [MatToolbarModule, MatButtonModule],
})
export class AppMaterialModule {}
