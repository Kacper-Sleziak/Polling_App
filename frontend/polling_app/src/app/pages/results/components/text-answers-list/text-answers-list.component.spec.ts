import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnswersListComponent } from './text-answers-list.component';

describe('TextAnswersListComponent', () => {
  let component: TextAnswersListComponent;
  let fixture: ComponentFixture<TextAnswersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAnswersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAnswersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
