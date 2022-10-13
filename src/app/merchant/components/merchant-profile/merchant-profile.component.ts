import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { environment as env } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/helper/services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-merchant-profile',
  templateUrl: './merchant-profile.component.html',
  styleUrls: ['./merchant-profile.component.css'],
})
export class MerchantProfileComponent implements OnInit {
  loggedUser: any;
  token: any;
  isLinear = false;
  selectedFile!: File;
  MainInfoFormGroup!: FormGroup;
  PaymentInfoFormGroup!: FormGroup;
  PasswordFormGroup!: FormGroup;
  imageSelected = false;
  stepperOrientation: Observable<StepperOrientation>;
  apiRootImage = env.apiRootImage;

  constructor(
    private toast: ToastrService,
    private as: AuthService,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.mainService.setTitleAndMeta('الملف الشخثي', '');
    this.token = localStorage.getItem('userToken');
    this.as.user.subscribe((response) => {
      this.loggedUser = response;
    });

    this.PasswordFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
  }

  updateInfo(form: any) {
    let formData: any = {};
    Object.entries(form).forEach(([key, value], index) => {
      if (value != '') {
        formData[key] = value;
      }
    });
    this.mainService.updateUserData(formData, this.token).subscribe(
      (response) => {
        this.as
          .getLoggedUserPersonalInfo(this.token)
          .subscribe((response: any) => {
            this.as.user.next(response?.body);
            this.toast.success('تم تعديل بياناتك بنجاح', 'تعديل البيانات');
          });
      },
      (err: any) => {
        if (err.error.message.includes('duplicate phone entered')) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ في تعديل البيانات',
            text: 'هذا الرقم مسجل من قبل!',
          });
        } else if (
          err.error.message.includes('whatsapp_num: Phone is invalid')
        ) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ في تعديل البيانات',
            text: 'رقم الواتساب غير صحيح!',
          });
        }
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.imageSelected = true;
  }

  uploadImage() {
    const fd = new FormData();
    fd.append('avatar', this.selectedFile, this.selectedFile?.name);
    this.mainService.uploadImage(fd, this.token).subscribe((res) => {
      this.as
        .getLoggedUserPersonalInfo(this.token)
        .subscribe((response: any) => {
          this.as.user.next(response?.body);
          this.imageSelected = false;
          this.toast.success('تم تغيير الصورة بنجاح', 'تغيير الصورة الشخصية');
        });
    });
  }

  changePassword(form: any) {
    this.mainService.changePassword(form.value, this.token).subscribe({
      next: () => {
        form.reset();
        this.toast.success('تم تغيير كلمة المرور بنجاح', 'تعديل البيانات');
      },
      error: (err: any) => {
        if (err.error.message.includes('old and new password are same')) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ في تغيير كلمة المرور',
            text: 'كلمة المرور القديمة هي نفس كلمة المرور الجديدة',
          });
        }
      },
    });
  }
}
