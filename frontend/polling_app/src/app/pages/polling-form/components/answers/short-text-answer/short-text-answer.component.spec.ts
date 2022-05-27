import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTextAnswerComponent } from './short-text-answer.component';

describe('ShortTextAnswerComponent', () => {
  let component: ShortTextAnswerComponent;
  let fixture: ComponentFixture<ShortTextAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortTextAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortTextAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
