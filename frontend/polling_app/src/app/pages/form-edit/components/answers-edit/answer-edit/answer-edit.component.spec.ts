import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerEditComponent } from './answer-edit.component';

describe('AnswerEditComponent', () => {
  let component: AnswerEditComponent;
  let fixture: ComponentFixture<AnswerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
