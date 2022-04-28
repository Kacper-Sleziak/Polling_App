import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePollCardComponent } from './create-poll-card.component';

describe('CreatePollCardComponent', () => {
  let component: CreatePollCardComponent;
  let fixture: ComponentFixture<CreatePollCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePollCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePollCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
