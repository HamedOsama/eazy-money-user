import { Component, OnInit } from '@angular/core';
import { RoutingAnimation } from '../../../shared/animations/routing-animation';

@Component({
  selector: 'app-sales-website-view',
  templateUrl: './sales-website-view.component.html',
  styleUrls: ['./sales-website-view.component.css'],
  animations: [RoutingAnimation],
})
export class SalesWebsiteViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onActivate(event: any) {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  }
}
