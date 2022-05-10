import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleAnswerEditComponent } from './scale-answer-edit.component';

describe('ScaleAnswerEditComponent', () => {
  let component: ScaleAnswerEditComponent;
  let fixture: ComponentFixture<ScaleAnswerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleAnswerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
