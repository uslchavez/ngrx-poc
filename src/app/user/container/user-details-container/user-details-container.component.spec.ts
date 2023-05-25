import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { UserDetailsContainerComponent } from './user-details-container.component';
import { UserMaterialModule } from '../../user-material.module';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';

describe('UserDetailsContainerComponent', () => {
  let fixture: ComponentFixture<UserDetailsContainerComponent>;
  let component: UserDetailsContainerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsContainerComponent, UserDetailsComponent],
      imports: [UserMaterialModule],
      providers: [provideMockStore({ initialState: [] })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsContainerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
