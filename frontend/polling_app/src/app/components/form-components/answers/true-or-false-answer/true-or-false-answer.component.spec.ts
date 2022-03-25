import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueOrFalseAnswerComponent } from './true-or-false-answer.component';

describe('TrueOrFalseAnswerComponent', () => {
  let component: TrueOrFalseAnswerComponent;
  let fixture: ComponentFixture<TrueOrFalseAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrueOrFalseAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrueOrFalseAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
