import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/helper/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

interface RegisterModel {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  address: string;
  status: string;
  photo: string;
  whatsapp_num: number;
  facebook: string;
  website: string;
  payment_method: string;
  payment_method_number: number;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  subscription: Subscription = new Subscription();

  showWaiting: boolean;
  passValid: boolean;
  hasUpper: any;
  hasLower: any;
  hasSymbol: any;
  hasNumber: any;

  @ViewChild('image') image!: ElementRef<any>;
  constructor(
    private as: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.showWaiting = false;
    this.passValid = true;
  }

  ngOnInit() {}

  signup(form1: any, form2: any) {
    this.showWaiting = true;

    const userModel: RegisterModel = {
      name: form1.firstName + ' ' + form1.lastName,
      email: form1.email,
      phone: form1.phone,
      password: form1.password,
      role: form1.role,
      address: form2.address,
      status: 'active',
      photo: form2.image,
      whatsapp_num: form2.whatsNum,
      facebook: form2.faceLink,
      website: form2.webLink,
      payment_method: form2.paymentMethod,
      payment_method_number: form2.paymentNumber,
    };
    this.subscription.add(
      this.as.userRegister(userModel).subscribe({
        next: (res: any) => {
          this.as.user.next(res?.body?.user);
          this.as.token.next(res?.token);
          localStorage.setItem('userToken', res?.token);
          localStorage.setItem('userRole', res?.body?.user?.role);
          this.showWaiting = false;
          this.toast.success('تم انشاء الحساب بنجاح', 'انشاء حساب');
          this.router.navigate([`${res?.data?.role}/dashboard`]);
        },
        error: (err: any) => {
          if (err.error.message.includes('duplicate email entered')) {
            Swal.fire({
              icon: 'error',
              title: 'خطأ في انشاء الحساب',
              text: 'هذا البريد الالكتروني لدية حساب بالفعل!',
            });

            // this.errorRecord.text = 'هذا البريد الالكتروني لدية حساب بالفعل!';
            // this.errorRecord.fire();
          } else if (err.error.message.includes('duplicate phone entered')) {
            Swal.fire({
              icon: 'error',
              title: 'خطأ في انشاء الحساب',
              text: 'هذا الرقم لدية حساب بالموقع بالفعل!',
            });
            // this.errorRecord.text = 'هذا الرقم لدية حساب بالموقع بالفعل!';
            // this.errorRecord.fire();
          } else if (
            err.error.message.includes('phone: Phone number is invalid')
          ) {
            Swal.fire({
              icon: 'error',
              title: 'خطأ في انشاء الحساب',
              text: 'رقم الهاتف غير صحيح!',
            });
          } else if (
            err.error.message.includes('whatsapp_num: Phone is invalid')
          ) {
            Swal.fire({
              icon: 'error',
              title: 'خطأ في انشاء الحساب',
              text: 'رقم الواتساب غير صحيح!',
            });
          }
          this.showWaiting = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
