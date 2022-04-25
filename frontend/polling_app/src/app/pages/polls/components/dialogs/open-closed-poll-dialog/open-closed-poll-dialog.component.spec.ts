import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenClosedPollDialogComponent } from './open-closed-poll-dialog.component';

describe('OpenClosedPollDialogComponent', () => {
  let component: OpenClosedPollDialogComponent;
  let fixture: ComponentFixture<OpenClosedPollDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenClosedPollDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenClosedPollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
