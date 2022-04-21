import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditComponent } from './question-edit.component';

describe('QuestionEditComponent', () => {
  let component: QuestionEditComponent;
  let fixture: ComponentFixture<QuestionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
