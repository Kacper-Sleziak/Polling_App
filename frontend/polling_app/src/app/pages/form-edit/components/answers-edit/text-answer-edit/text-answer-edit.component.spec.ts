import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnswerEditComponent } from './text-answer-edit.component';

describe('TextAnswerEditComponent', () => {
  let component: TextAnswerEditComponent;
  let fixture: ComponentFixture<TextAnswerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAnswerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
