import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MerchantGuard implements CanActivate {
  userRole = localStorage.getItem('userRole');

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (this.userRole == 'seller') {
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }
}
