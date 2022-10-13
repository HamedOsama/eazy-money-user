import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerDashboardComponent } from './marketer-dashboard.component';

describe('MarketerDashboardComponent', () => {
  let component: MarketerDashboardComponent;
  let fixture: ComponentFixture<MarketerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
