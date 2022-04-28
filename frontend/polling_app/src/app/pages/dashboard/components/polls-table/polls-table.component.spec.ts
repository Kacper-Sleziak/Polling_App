import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollsTableComponent } from './polls-table.component';

describe('PollsTableComponent', () => {
  let component: PollsTableComponent;
  let fixture: ComponentFixture<PollsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
