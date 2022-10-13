import { Component } from '@angular/core';
import { RoutingAnimation } from './shared/animations/routing-animation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [RoutingAnimation],
})
export class AppComponent {
  onActivate(event: any) {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 800);
  }
}
