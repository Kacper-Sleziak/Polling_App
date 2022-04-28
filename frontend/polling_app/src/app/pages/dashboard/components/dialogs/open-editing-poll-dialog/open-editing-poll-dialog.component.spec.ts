import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEditingPollDialogComponent } from './open-editing-poll-dialog.component';

describe('OpenEditingPollDialogComponent', () => {
  let component: OpenEditingPollDialogComponent;
  let fixture: ComponentFixture<OpenEditingPollDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenEditingPollDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenEditingPollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
