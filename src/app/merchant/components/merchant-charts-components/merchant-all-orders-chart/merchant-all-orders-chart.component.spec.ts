import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAllOrdersChartComponent } from './merchant-all-orders-chart.component';

describe('MerchantAllOrdersChartComponent', () => {
  let component: MerchantAllOrdersChartComponent;
  let fixture: ComponentFixture<MerchantAllOrdersChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantAllOrdersChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantAllOrdersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
