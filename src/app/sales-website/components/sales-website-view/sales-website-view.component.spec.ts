import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesWebsiteViewComponent } from './sales-website-view.component';

describe('SalesWebsiteViewComponent', () => {
  let component: SalesWebsiteViewComponent;
  let fixture: ComponentFixture<SalesWebsiteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesWebsiteViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesWebsiteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
