import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private _snackbar: MatSnackBar) {}

  success(message: string) {
    this.showMessage('success', message);
  }

  failure(message: string) {
    this.showMessage('error', message);
  }

  private showMessage(type: 'error' | 'success', message: string) {
    this._snackbar.open(message, undefined, {
      panelClass: type === 'error' ? 'error-message' : 'success-message',
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
