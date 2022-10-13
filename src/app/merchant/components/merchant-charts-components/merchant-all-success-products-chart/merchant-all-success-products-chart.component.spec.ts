import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAllSuccessProductsChartComponent } from './merchant-all-success-products-chart.component';

describe('MerchantAllSuccessProductsChartComponent', () => {
  let component: MerchantAllSuccessProductsChartComponent;
  let fixture: ComponentFixture<MerchantAllSuccessProductsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantAllSuccessProductsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantAllSuccessProductsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
