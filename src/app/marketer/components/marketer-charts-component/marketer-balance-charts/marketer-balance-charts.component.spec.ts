import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerBalanceChartsComponent } from './marketer-balance-charts.component';

describe('MarketerBalanceChartsComponent', () => {
  let component: MarketerBalanceChartsComponent;
  let fixture: ComponentFixture<MarketerBalanceChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerBalanceChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerBalanceChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
