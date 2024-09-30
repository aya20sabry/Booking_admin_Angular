import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListControlComponent } from './users-list-control.component';

describe('UsersListControlComponent', () => {
  let component: UsersListControlComponent;
  let fixture: ComponentFixture<UsersListControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
