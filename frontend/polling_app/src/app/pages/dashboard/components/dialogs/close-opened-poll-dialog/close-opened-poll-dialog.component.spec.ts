import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOpenedPollDialogComponent } from './close-opened-poll-dialog.component';

describe('CloseOpenedPollDialogComponent', () => {
  let component: CloseOpenedPollDialogComponent;
  let fixture: ComponentFixture<CloseOpenedPollDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOpenedPollDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOpenedPollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
