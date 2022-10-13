import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/helper/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // @ViewChild('errorRecord') private errorRecord!: SwalComponent;
  showWaiting: boolean;

  subscription: Subscription = new Subscription();

  constructor(
    private as: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.showWaiting = false;
  }

  ngOnInit(): void {}

  login(form: any) {
    this.showWaiting = true;
    this.subscription.add(
      this.as.userLogin(form.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.as.user.next(res?.body?.user);
          this.as.token.next(res?.user?.token);
          localStorage.setItem('userToken', res?.token);
          localStorage.setItem('userRole', res?.body?.user?.role);
          this.showWaiting = false;
          this.toast.success('تم تسجيل الدخول بنجاح', 'تسجيل الدخول');
          this.router.navigate([`${res?.body?.user?.role}/dashboard`]);
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: 'تسجيل الدخول',
            text: 'البريد الالكتروني او كلمة السر غير صحيحة!',
          });
          this.showWaiting = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
