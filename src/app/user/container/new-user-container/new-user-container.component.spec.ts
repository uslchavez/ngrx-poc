import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { NewUserContainerComponent } from './new-user-container.component';
import { UserMaterialModule } from '../../user-material.module';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { actions } from '../../store';
import { User } from '../../models';

describe('NewUserContainerComponent', () => {
  let fixture: ComponentFixture<NewUserContainerComponent>;
  let component: NewUserContainerComponent;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUserContainerComponent, UserDetailsComponent],
      imports: [UserMaterialModule, FormsModule, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState: {}, selectors: [] })],
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should dispatch actions calling onCreate()', () => {
    const newUser: User = {
      avatar: 'http://www.avatars.com/new-avatar.jpg',
      email: 'user01@mail.com',
      first_name: 'user',
      last_name: 'name',
      id: 0,
    };
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onCreate(newUser);

    expect(dispatchSpy).toHaveBeenCalledWith(
      actions.createUser({ payload: newUser })
    );
  });
});
