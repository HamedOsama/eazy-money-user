import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketerAddRequestsComponent } from './marketer-add-requests.component';

describe('MarketerAddRequestsComponent', () => {
  let component: MarketerAddRequestsComponent;
  let fixture: ComponentFixture<MarketerAddRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketerAddRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketerAddRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
