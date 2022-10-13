import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { RoutingAnimation } from 'src/app/shared/animations/routing-animation';
import { MainService } from 'src/app/shared/services/main.service';
import { AuthService } from 'src/app/helper/services/auth.service';
import { environment as env } from 'src/environments/environment.prod';
@Component({
  selector: 'app-merchant-view',
  templateUrl: './merchant-view.component.html',
  styleUrls: ['./merchant-view.component.css'],
  animations: [RoutingAnimation],
})
export class MerchantViewComponent implements OnInit, AfterViewInit {
  @ViewChild('snav') sidenav!: MatSidenav;
  result: boolean = true;
  mobileQuery: MediaQueryList;
  loggedUser: any;
  token: any;
  loading = true;
  apiRootImage = env.apiRootImage;

  private _mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private toast: ToastrService,
    private mainService: MainService,
    private as: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1200px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('userToken');
    this.as.getLoggedUserPersonalInfo(this.token).subscribe((response: any) => {
      this.as.user.next(response.body);
      this.as.user.subscribe((response) => {
        this.loggedUser = response;
        this.loading = false;
      });
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    this.toast.success('logout successfully', 'Logout');
    this.router.navigate(['/auth']);
  }

  onActivate(event: any) {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
