import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDashboard } from './logs-dashboard';

describe('LogsDashboard', () => {
  let component: LogsDashboard;
  let fixture: ComponentFixture<LogsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
