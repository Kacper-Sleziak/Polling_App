import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleAnswerComponent } from './scale-answer.component';

describe('ScaleAnswerComponent', () => {
  let component: ScaleAnswerComponent;
  let fixture: ComponentFixture<ScaleAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScaleAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
