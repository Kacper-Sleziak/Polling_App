import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioAnswerEditComponent } from './radio-answer-edit.component';

describe('RadioAnswerEditComponent', () => {
  let component: RadioAnswerEditComponent;
  let fixture: ComponentFixture<RadioAnswerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioAnswerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
