import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  contact_data: any;
  subscription: any;
  showLoading!: boolean;
  userId: any;

  constructor(private ms: MainService) {
    this.showLoading = false;
  }

  ngOnInit(): void {
    // this.mainService.setTitleAndMeta('تواصل معنا', '');
    // this.getContactData();
  }

  sendContact(form: any) {
    let contactData: any = {};
    Object.entries(form.value).forEach(([key, value], index) => {
      if (value != '') {
        contactData[key] = value;
      }
    });


    this.ms.sendAMessageForUs(contactData).subscribe(
      (res) => {
    form.reset();

      },
      (error) => {
        if (error.error.message.includes('Phone number is invalid')) {
          Swal.fire({
            icon: 'error',
            title: 'خطأ في البيانات',
            text: 'رقم الهاتف غير صحيح',
          });
        }
      }
    );
  }
}
