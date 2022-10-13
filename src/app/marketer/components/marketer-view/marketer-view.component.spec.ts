import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerViewComponent } from './marketer-view.component';

describe('MarketerViewComponent', () => {
  let component: MarketerViewComponent;
  let fixture: ComponentFixture<MarketerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
