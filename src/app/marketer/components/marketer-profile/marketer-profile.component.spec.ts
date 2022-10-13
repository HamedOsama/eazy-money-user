import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerProfileComponent } from './marketer-profile.component';

describe('MarketerProfileComponent', () => {
  let component: MarketerProfileComponent;
  let fixture: ComponentFixture<MarketerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
