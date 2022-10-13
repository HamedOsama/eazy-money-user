import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAllRejectedProductsChartComponent } from './merchant-all-rejected-products-chart.component';

describe('MerchantAllRejectedProductsChartComponent', () => {
  let component: MerchantAllRejectedProductsChartComponent;
  let fixture: ComponentFixture<MerchantAllRejectedProductsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantAllRejectedProductsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantAllRejectedProductsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
