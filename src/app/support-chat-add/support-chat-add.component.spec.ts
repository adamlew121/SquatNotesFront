import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportChatAddComponent } from './support-chat-add.component';

describe('SupportChatAddComponent', () => {
  let component: SupportChatAddComponent;
  let fixture: ComponentFixture<SupportChatAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportChatAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportChatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
