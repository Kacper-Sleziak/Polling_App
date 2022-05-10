import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTextAnswerEditComponent } from './short-text-answer-edit.component';

describe('ShortTextAnswerEditComponent', () => {
  let component: ShortTextAnswerEditComponent;
  let fixture: ComponentFixture<ShortTextAnswerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortTextAnswerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortTextAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
