import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerSuccessOrdersChartsComponent } from './marketer-success-orders-charts.component';

describe('MarketerSuccessOrdersChartsComponent', () => {
  let component: MarketerSuccessOrdersChartsComponent;
  let fixture: ComponentFixture<MarketerSuccessOrdersChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerSuccessOrdersChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerSuccessOrdersChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
