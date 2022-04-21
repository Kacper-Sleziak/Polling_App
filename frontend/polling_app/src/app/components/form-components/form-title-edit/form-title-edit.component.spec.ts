import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTitleEditComponent } from './form-title-edit.component';

describe('FormTitleEditComponent', () => {
  let component: FormTitleEditComponent;
  let fixture: ComponentFixture<FormTitleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTitleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTitleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
