import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistsDashboard } from './specialists-dashboard';

describe('SpecialistsDashboard', () => {
  let component: SpecialistsDashboard;
  let fixture: ComponentFixture<SpecialistsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
