import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { take } from 'rxjs';

import { UserFormComponent } from './user-form.component';

function fillInput(inputEl: HTMLInputElement, value: string) {
  inputEl.value = value;
  inputEl.dispatchEvent(new Event('input'));
}

describe('UserFormComponent', () => {
  let fixture: ComponentFixture<UserFormComponent>;
  let component: UserFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should emit login after clicking login button', (done: DoneFn) => {
    component.currentPage = 'login';
    fixture.detectChanges();

    // listen output
    component.login.pipe(take(1)).subscribe((form) => {
      expect(form.password).toEqual('123qwe');
      expect(form.email).toEqual('test@test.com');
      done();
    });

    // set form fields
    const emailFieldEl = fixture.nativeElement.querySelector(
      'input[data-testid="email-field"]'
    ) as HTMLInputElement;
    const passwordFieldEl = fixture.nativeElement.querySelector(
      'input[data-testid="password-field"]'
    ) as HTMLInputElement;
    fillInput(emailFieldEl, 'test@test.com');
    fillInput(passwordFieldEl, '123qwe');
    fixture.detectChanges();

    // trigger click event
    const button = fixture.nativeElement.querySelector(
      'button[data-testid="login-button"]'
    ) as HTMLButtonElement;
    button.click();
  });

  it('should emit register after clicking register button', (done: DoneFn) => {
    component.currentPage = 'register';
    fixture.detectChanges();

    // listen output
    component.register.pipe(take(1)).subscribe((form) => {
      expect(form.password).toEqual('123qwe');
      expect(form.email).toEqual('test@test.com');
      done();
    });

    // set form fields
    const emailFieldEl = fixture.nativeElement.querySelector(
      'input[data-testid="email-field"]'
    ) as HTMLInputElement;
    const passwordFieldEl = fixture.nativeElement.querySelector(
      'input[data-testid="password-field"]'
    ) as HTMLInputElement;
    fillInput(emailFieldEl, 'test@test.com');
    fillInput(passwordFieldEl, '123qwe');
    fixture.detectChanges();

    // trigger click event
    const button = fixture.nativeElement.querySelector(
      'button[data-testid="register-button"]'
    ) as HTMLButtonElement;
    button.click();
  });
});
