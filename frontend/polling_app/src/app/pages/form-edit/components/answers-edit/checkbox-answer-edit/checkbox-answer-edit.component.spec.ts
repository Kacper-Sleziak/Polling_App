import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxAnswerEditComponent } from './checkbox-answer-edit.component';

describe('CheckboxAnswerEditComponent', () => {
  let component: CheckboxAnswerEditComponent;
  let fixture: ComponentFixture<CheckboxAnswerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxAnswerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
