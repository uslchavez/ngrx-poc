import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { UserListContainerComponent } from './user-list-container.component';
import { UserMaterialModule } from '../../user-material.module';

describe('UserListContainerComponent', () => {
  let fixture: ComponentFixture<UserListContainerComponent>;
  let component: UserListContainerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListContainerComponent],
      imports: [UserMaterialModule],
      providers: [provideMockStore({ initialState: [], selectors: [] })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListContainerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
