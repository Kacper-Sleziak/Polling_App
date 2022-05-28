import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditControlsComponent } from './question-edit-controls.component';

describe('QuestionEditControlsComponent', () => {
  let component: QuestionEditControlsComponent;
  let fixture: ComponentFixture<QuestionEditControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionEditControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
