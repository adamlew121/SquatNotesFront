import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListFilterComponent } from './profile-list-filter.component';

describe('ProfileListFilterComponent', () => {
  let component: ProfileListFilterComponent;
  let fixture: ComponentFixture<ProfileListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
