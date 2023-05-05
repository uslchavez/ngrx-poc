import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatListModule } from '@angular/material/list';

@NgModule({
  exports: [MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class UserMaterialModule {}
