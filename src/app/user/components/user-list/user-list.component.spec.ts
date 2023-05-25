import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMaterialModule } from '../../user-material.module';
import { UserListComponent } from './user-list.component';
import { User } from '../../models';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs';

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [UserMaterialModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render user list', () => {
    const users: User[] = [
      {
        avatar: 'http://avatars.com/3',
        email: 'lperez@mail.com',
        first_name: 'Luis',
        last_name: 'Perez',
        id: 1,
      },
    ];
    component.users = users;

    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(listItems.length).toBe(1);
    const itemEl = listItems[0].nativeElement as HTMLElement;
    expect(
      itemEl.querySelector('[data-testid="list-user-email"]')?.textContent
    ).toBe(users[0].email);
    expect(
      itemEl.querySelector('[data-testid="list-user-img"]')?.getAttribute('src')
    ).toBe(users[0].avatar);
    expect(
      itemEl.querySelector('[data-testid="list-user-name"]')?.textContent
    ).toEqual(`${users[0].first_name} ${users[0].last_name}`);
  });

  it('should emit a user when clicking a list item', (done: DoneFn) => {
    const users: User[] = [
      {
        avatar: 'http://avatars.com/3',
        email: 'lperez@mail.com',
        first_name: 'Luis',
        last_name: 'Perez',
        id: 1,
      },
    ];
    component.users = users;

    fixture.detectChanges();
    component.itemClick.pipe(take(1)).subscribe((user) => {
      expect(user).toBe(users[0]);
      done();
    });

    const listItem = fixture.debugElement.query(By.css('mat-list-item'));
    listItem.triggerEventHandler('click');
  });
});
