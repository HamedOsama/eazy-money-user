import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerAllOrdersComponent } from './marketer-all-orders.component';

describe('MarketerAllOrdersComponent', () => {
  let component: MarketerAllOrdersComponent;
  let fixture: ComponentFixture<MarketerAllOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerAllOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerAllOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
