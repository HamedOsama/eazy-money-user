import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerRejectedOrdersChartsComponent } from './marketer-rejected-orders-charts.component';

describe('MarketerRejectedOrdersChartsComponent', () => {
  let component: MarketerRejectedOrdersChartsComponent;
  let fixture: ComponentFixture<MarketerRejectedOrdersChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerRejectedOrdersChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerRejectedOrdersChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
