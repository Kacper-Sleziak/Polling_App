import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxAnswerComponent } from './combobox-answer.component';

describe('ComboboxAnswerComponent', () => {
  let component: ComboboxAnswerComponent;
  let fixture: ComponentFixture<ComboboxAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboboxAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
