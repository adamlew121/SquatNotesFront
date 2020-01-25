import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTesterComponent } from './http-tester.component';

describe('HttpTesterComponent', () => {
  let component: HttpTesterComponent;
  let fixture: ComponentFixture<HttpTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
