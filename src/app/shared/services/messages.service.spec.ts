import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesService } from './messages.service';

const matSnackBarMock = {
  open: jasmine.createSpy,
};

describe('', () => {
  let service: MessagesService;
  let matSnackBar: MatSnackBar;
  let openSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessagesService,
        {
          provide: MatSnackBar,
          useValue: matSnackBarMock,
        },
      ],
    });

    service = TestBed.inject(MessagesService);
    matSnackBar = TestBed.inject(MatSnackBar);
    openSpy = spyOn(matSnackBar, 'open');
  });

  it('should call snack bar open method on success', () => {
    service.success('Example Success');

    expect(openSpy).toHaveBeenCalledWith('Example Success', undefined, {
      panelClass: 'success-message',
      duration: 2000,
      verticalPosition: 'top',
    });
  });

  it('should call snack bar open method on failure', () => {
    service.failure('Example Failure');

    expect(openSpy).toHaveBeenCalledWith('Example Failure', undefined, {
      panelClass: 'error-message',
      duration: 2000,
      verticalPosition: 'top',
    });
  });
});
