import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerOrderTimelineComponent } from './marketer-order-timeline.component';

describe('MarketerOrderTimelineComponent', () => {
  let component: MarketerOrderTimelineComponent;
  let fixture: ComponentFixture<MarketerOrderTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerOrderTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerOrderTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
