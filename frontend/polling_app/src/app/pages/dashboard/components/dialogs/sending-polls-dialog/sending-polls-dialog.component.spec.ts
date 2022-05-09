import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingPollsDialogComponent } from './sending-polls-dialog.component';

describe('SendingPollsDialogComponent', () => {
  let component: SendingPollsDialogComponent;
  let fixture: ComponentFixture<SendingPollsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendingPollsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingPollsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
