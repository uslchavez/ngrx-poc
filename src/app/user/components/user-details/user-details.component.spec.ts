import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { UserDetailsComponent } from './user-details.component';
import { UserMaterialModule } from '../../user-material.module';
import { User } from '../../models';

describe('UserDetailsComponent', () => {
  let fixture: ComponentFixture<UserDetailsComponent>;
  let component: UserDetailsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsComponent],
      imports: [UserMaterialModule, FormsModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should fill user info into the form and not show create button', fakeAsync(() => {
    const user: User = {
      avatar: '',
      email: 'test@test.com',
      first_name: 'John',
      last_name: 'Doe',
      id: 2,
    };

    component.user = user;
    component.ngOnInit();
    fixture.detectChanges();

    const emailInputEl = fixture.debugElement.query(
      By.css('[data-testid="email-input"]')
    ).nativeElement as HTMLInputElement;
    const firstNameInputEl = fixture.debugElement.query(
      By.css('[data-testid="first-name-input"]')
    ).nativeElement as HTMLInputElement;
    const lastNameInputEl = fixture.debugElement.query(
      By.css('[data-testid="last-name-input"]')
    ).nativeElement as HTMLInputElement;
    const createButton = fixture.debugElement.query(
      By.css('[data-testid="create-button"]')
    );
    tick();

    expect(emailInputEl.value).toEqual(user.email);
    expect(firstNameInputEl.value).toEqual(user.first_name);
    expect(lastNameInputEl.value).toEqual(user.last_name);
    expect(createButton).toBeNull();
  }));

  it('should display create button if user has no id', () => {
    const createButton = fixture.debugElement.query(
      By.css('[data-testid="create-button"]')
    );

    expect(createButton).toBeDefined();
  });

  it('should emit outputs after clicking update or delete button', fakeAsync(() => {
    const user: User = {
      avatar: '',
      email: 'test@test.com',
      first_name: 'John',
      last_name: 'Doe',
      id: 2,
    };

    component.user = user;
    component.ngOnInit();
    fixture.detectChanges();
    tick(1);

    const updateButton = fixture.debugElement.query(
      By.css('[data-testid="update-button"]')
    ).nativeElement as HTMLButtonElement;
    const deleteButton = fixture.debugElement.query(
      By.css('[data-testid="delete-button"]')
    ).nativeElement as HTMLButtonElement;

    component.update.subscribe((value) => {
      expect(value.email).toBe(user.email);
      expect(value.first_name).toBe(user.first_name);
      expect(value.last_name).toBe(user.last_name);
    });
    component.delete.subscribe((value) => {
      expect(value.email).toBe(user.email);
      expect(value.first_name).toBe(user.first_name);
      expect(value.last_name).toBe(user.last_name);
    });

    updateButton.click();
    deleteButton.click();
  }));

  it('should emit create output after clicking create button', fakeAsync(() => {
    const newUser: User = {
      email: 'new@test.com',
      first_name: 'John',
      last_name: 'Doe',
      avatar: '',
      id: 0,
    };
    component.user = newUser;
    component.ngOnInit();
    fixture.detectChanges();
    tick();

    const createButton = fixture.debugElement.query(
      By.css('[data-testid="create-button"]')
    );

    component.create.subscribe((value) => {
      expect(value.email).toEqual('new@test.com');
      expect(value.first_name).toEqual('John');
      expect(value.last_name).toEqual('Doe');
    });

    createButton.triggerEventHandler('click');
  }));
});
