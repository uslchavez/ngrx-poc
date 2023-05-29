import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { UserListContainerComponent } from './user-list-container.component';
import { UserMaterialModule } from '../../user-material.module';
import { actions } from '../../store';
import { User } from '../../models';
import { routerActions } from 'src/app/store';

describe('UserListContainerComponent', () => {
  let fixture: ComponentFixture<UserListContainerComponent>;
  let component: UserListContainerComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListContainerComponent],
      imports: [UserMaterialModule],
      providers: [provideMockStore({ initialState: [], selectors: [] })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should dispatch two actions when user clicks user item', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const selectedUser: User = {
      avatar: 'http://www.avatars.com/same_avatar.jpg',
      email: 'generic@mail.com',
      first_name: 'name',
      id: 1,
      last_name: 'last name',
    };

    component.onItemClicked(selectedUser);

    expect(dispatchSpy.calls.allArgs()).toEqual([
      [actions.loadSingleUserSuccess({ payload: { data: selectedUser } })],
      [routerActions.go({ payload: ['users', `${selectedUser.id}`] })],
    ]);
  });
});
