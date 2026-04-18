import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulrsDashboard } from './rulrs-dashboard';

describe('RulrsDashboard', () => {
  let component: RulrsDashboard;
  let fixture: ComponentFixture<RulrsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulrsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulrsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
