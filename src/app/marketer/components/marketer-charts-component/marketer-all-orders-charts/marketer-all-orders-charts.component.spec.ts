import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerAllOrdersChartsComponent } from './marketer-all-orders-charts.component';

describe('MarketerAllOrdersChartsComponent', () => {
  let component: MarketerAllOrdersChartsComponent;
  let fixture: ComponentFixture<MarketerAllOrdersChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerAllOrdersChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerAllOrdersChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
