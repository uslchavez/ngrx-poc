import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginContainerComponent } from './login-container.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoginContainerComponent', () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginContainerComponent, UserFormComponent],
      providers: [
        provideMockStore({
          initialState: { auth: { entities: [] } },
          selectors: [],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action after calling onLogin method', () => {
    const dispatchSpy = spyOn(component['store'], 'dispatch');

    component.onLogin({ email: '', password: '' });

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should dispatch action after calling onLogin method', () => {
    const dispatchSpy = spyOn(component['store'], 'dispatch');

    component.onRegister({ email: '', password: '' });

    expect(dispatchSpy).toHaveBeenCalled();
  });
});

describe('LoginContainerComponent', () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginContainerComponent, UserFormComponent],
      providers: [
        provideMockStore({
          initialState: { auth: { entities: [] } },
          selectors: [],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              page: 'register',
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should assign the title depending on the current page', () => {
    expect(component.title).toEqual('Sign Up Page');
  });
});
