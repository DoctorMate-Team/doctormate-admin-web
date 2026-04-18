import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementDashboard } from './payement-dashboard';

describe('PayementDashboard', () => {
  let component: PayementDashboard;
  let fixture: ComponentFixture<PayementDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayementDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
