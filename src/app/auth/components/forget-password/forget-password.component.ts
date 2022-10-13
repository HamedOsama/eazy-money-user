import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/helper/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  token: any;
  showWaiting: boolean;

  subscription: Subscription = new Subscription();

  constructor(
    private as: AuthService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.showWaiting = false;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('userToken');
  }

  sendMail(data: any) {
    console.log(data);
    this.showWaiting = true;
    this.subscription.add(
      this.as.forgetPassword(data).subscribe({
        next: (res: any) => {
          this.toast.success('تم ارسال الرسالة بنجاح!', 'نسيت كلمة المرور');
          this.showWaiting = false;
        },
        error: (err) => {
          this.toast.error(err?.error?.message);
          this.showWaiting = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
