import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';

import { NewUserContainerComponent } from './new-user-container.component';
import { UserMaterialModule } from '../../user-material.module';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewUserContainerComponent', () => {
  let fixture: ComponentFixture<NewUserContainerComponent>;
  let component: NewUserContainerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUserContainerComponent, UserDetailsComponent],
      imports: [UserMaterialModule, FormsModule, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState: {}, selectors: [] })],
    }).compileComponents();

    fixture = TestBed.createComponent(NewUserContainerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
