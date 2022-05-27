import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxAnswerEditComponent } from './combobox-answer-edit.component';

describe('ComboboxAnswerEditComponent', () => {
  let component: ComboboxAnswerEditComponent;
  let fixture: ComponentFixture<ComboboxAnswerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboboxAnswerEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxAnswerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
