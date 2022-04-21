import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsAsCardsComponent } from './polls-as-cards.component';

describe('PollsAsCardsComponent', () => {
  let component: PollsAsCardsComponent;
  let fixture: ComponentFixture<PollsAsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsAsCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollsAsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
