import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerBalanceComponent } from './marketer-balance.component';

describe('MarketerBalanceComponent', () => {
  let component: MarketerBalanceComponent;
  let fixture: ComponentFixture<MarketerBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
