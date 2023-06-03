import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLocalStorageService } from './auth/service/auth-localstorage.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let authLocalStorage: AuthLocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatButtonModule, MatToolbarModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    router = TestBed.inject(Router);
    authLocalStorage = TestBed.inject(AuthLocalStorageService);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a toolbar with links', () => {
    const toolbar: DebugElement = fixture.debugElement.query(
      By.css('mat-toolbar')
    );
    const links: DebugElement[] = fixture.debugElement.queryAll(By.css('a'));
    const usersAnchor: HTMLAnchorElement = links[0].nativeElement;
    const authLoginAnchor: HTMLAnchorElement = links[1].nativeElement;
    const authRegisterAnchor: HTMLAnchorElement = links[2].nativeElement;

    expect(toolbar).toBeDefined();
    expect(links.length).toBe(4);
    expect(usersAnchor.href).toContain('/users');
    expect(authLoginAnchor.href).toContain('/auth/login');
    expect(authRegisterAnchor.href).toContain('/auth/register');
  });

  it('should clear token and navigate to login after call logout', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const clearTokenSpy = spyOn(authLocalStorage, 'clearToken');

    component.logOut();

    expect(navigateSpy).toHaveBeenCalledWith(['auth', 'login']);
    expect(clearTokenSpy).toHaveBeenCalled();
  });
});
