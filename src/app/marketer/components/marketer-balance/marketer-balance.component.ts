import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/helper/services/auth.service';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-marketer-balance',
  templateUrl: './marketer-balance.component.html',
  styleUrls: ['./marketer-balance.component.css'],
})
export class MarketerBalanceComponent implements OnInit {
  user: any;
  token = localStorage.getItem('userToken');
  userBalance: any;
  transactions: any = [];
  loading = false;
  sendingRequest = false;
  fireBalanceErrorMessage = false;
  fireBalanceErrorMessage2 = false;
  currentDate: any;

  constructor(
    private mainService: MainService,
    private authService: AuthService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.mainService.setTitleAndMeta('الرصيد', '');
    this.authService.user.subscribe((response) => {
      this.user = response;
    });
    this.getUserBalance();
    this.getUserLastTransactions();
  }

  getUserBalance() {
    this.mainService.getUserBalance(this.token).subscribe((response: any) => {
      this.userBalance = response.data.balance;
      this.currentDate = new Date().toLocaleDateString();
    });
  }

  getUserLastTransactions() {
    this.mainService
      .getUserLastTransactions(this.token)
      .subscribe((response: any) => {
        this.transactions = response?.data;
      });
  }

  addWithdrawlRequest(form: any) {
    this.sendingRequest = true;
    this.mainService
      .addWithdrawlRequest(form, this.token)
      .subscribe((response) => {
        this.toast.success('تم تقديم طلب السحب بنجاح', 'طلب سحب ناجح');
        this.getUserBalance();
        // this.getUserTransactions();
        (document.getElementById('withdrawalInput') as HTMLInputElement).value =
          '';
        this.sendingRequest = false;
      });
  }

  calcBalanceOnFocus() {
    if (this.userBalance <= 0) {
      this.fireBalanceErrorMessage = true;
    }
  }

  calcBalanceOnChange(event: any) {
    if (event.value > this.userBalance) {
      this.fireBalanceErrorMessage = true;
    } else if (event.value < 100) {
      this.fireBalanceErrorMessage2 = true;
    } else {
      this.fireBalanceErrorMessage = false;
      this.fireBalanceErrorMessage2 = false;
    }
  }
}
