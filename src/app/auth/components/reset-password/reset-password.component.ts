// import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/helper/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  userToken: any;
  showWaiting: boolean;

  subscription: Subscription = new Subscription();

  constructor(
    private as: AuthService,
    private toast: ToastrService,
    private router: Router,
    private ar: ActivatedRoute
  ) {
    this.userToken = this.ar.snapshot.params['token'];
    console.log(this.userToken);

    this.showWaiting = false;
  }

  ngOnInit(): void {}

  resetPassword(data: any) {
    console.log(data);

    let sendedData = {
      password: data?.password,
    };
    this.subscription.add(
      this.as.resetPassword(sendedData, this.userToken).subscribe({
        next: (res: any) => {
          this.toast.success(
            'تم تعيين كلمة سر جديدة بنجاح!',
            'تعيين كلمة السر',
            {
              timeOut: 2000,
            }
          );
          setTimeout(() => {
            this.router.navigate(['auth/login']);
          }, 1500);
        },
        error: (err) => {
          this.toast.error(err?.error?.message);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
