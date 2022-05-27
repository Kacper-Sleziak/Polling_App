import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortAnswersListComponent } from './short-answers-list.component';

describe('ShortAnswersListComponent', () => {
  let component: ShortAnswersListComponent;
  let fixture: ComponentFixture<ShortAnswersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortAnswersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortAnswersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
