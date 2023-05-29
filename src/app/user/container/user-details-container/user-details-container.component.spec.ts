import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { UserDetailsContainerComponent } from './user-details-container.component';
import { UserMaterialModule } from '../../user-material.module';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';
import { User } from '../../models';
import { actions } from '../../store';

describe('UserDetailsContainerComponent', () => {
  let fixture: ComponentFixture<UserDetailsContainerComponent>;
  let component: UserDetailsContainerComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsContainerComponent, UserDetailsComponent],
      imports: [UserMaterialModule],
      providers: [provideMockStore({ initialState: [] })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should dispatch value calling onUpdate()', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const user: User = {
      avatar: 'http://www.avatars.com/same_avatar.jpg',
      email: 'mynew@mail.com',
      first_name: 'new name',
      id: 1,
      last_name: 'new last name',
    };

    component.onUpdate(user);

    expect(dispatchSpy).toHaveBeenCalledWith(
      actions.updateUser({ payload: user })
    );
  });

  it('should dispatch value calling onDelete()', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const user: User = {
      avatar: 'http://www.avatars.com/same_avatar.jpg',
      email: 'generic@mail.com',
      first_name: 'name',
      id: 1,
      last_name: 'last name',
    };

    component.onDelete(user);

    expect(dispatchSpy).toHaveBeenCalledWith(
      actions.deleteUser({ payload: user })
    );
  });
});
