import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingFormComponent } from './polling-form.component';

describe('PollingFormComponent', () => {
  let component: PollingFormComponent;
  let fixture: ComponentFixture<PollingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
