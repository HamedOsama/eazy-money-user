import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerBalanceHistoryComponent } from './marketer-balance-history.component';

describe('MarketerBalanceHistoryComponent', () => {
  let component: MarketerBalanceHistoryComponent;
  let fixture: ComponentFixture<MarketerBalanceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerBalanceHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerBalanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
