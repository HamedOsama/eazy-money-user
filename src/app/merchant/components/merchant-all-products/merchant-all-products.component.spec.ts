import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAllProductsComponent } from './merchant-all-products.component';

describe('MerchantAllProductsComponent', () => {
  let component: MerchantAllProductsComponent;
  let fixture: ComponentFixture<MerchantAllProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantAllProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantAllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
