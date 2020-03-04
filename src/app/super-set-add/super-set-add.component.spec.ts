import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSetAddComponent } from './super-set-add.component';

describe('SuperSetAddComponent', () => {
  let component: SuperSetAddComponent;
  let fixture: ComponentFixture<SuperSetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperSetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperSetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
