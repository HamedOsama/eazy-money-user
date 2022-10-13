import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MainService } from 'src/app/shared/services/main.service';

@Injectable({
  providedIn: 'root',
})
export class UnAuthGuard implements CanActivate {
  userRole = localStorage.getItem('userRole');
  constructor(private router: Router, private ms: MainService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!localStorage.getItem('userToken')) {
      return true;
    } else {
      this.router.navigate([this.userRole]);
      return false;
    }
  }
}
