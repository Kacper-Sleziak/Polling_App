import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnswersEditComponent } from './form-answers-edit.component';

describe('FormAnswersEditComponent', () => {
  let component: FormAnswersEditComponent;
  let fixture: ComponentFixture<FormAnswersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAnswersEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnswersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
