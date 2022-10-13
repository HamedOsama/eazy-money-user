import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBalanceChartComponent } from './merchant-balance-chart.component';

describe('MerchantBalanceChartComponent', () => {
  let component: MerchantBalanceChartComponent;
  let fixture: ComponentFixture<MerchantBalanceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantBalanceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
