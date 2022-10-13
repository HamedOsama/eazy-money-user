import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAllProductsChartComponent } from './merchant-all-products-chart.component';

describe('MerchantAllProductsChartComponent', () => {
  let component: MerchantAllProductsChartComponent;
  let fixture: ComponentFixture<MerchantAllProductsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantAllProductsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantAllProductsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
