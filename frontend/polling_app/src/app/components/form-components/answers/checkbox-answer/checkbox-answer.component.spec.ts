import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxAnswerComponent } from './checkbox-answer.component';

describe('CheckboxAnswerComponent', () => {
  let component: CheckboxAnswerComponent;
  let fixture: ComponentFixture<CheckboxAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
