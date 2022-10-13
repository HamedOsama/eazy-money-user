import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/helper/services/auth.service';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-marketer-dashboard',
  templateUrl: './marketer-dashboard.component.html',
  styleUrls: ['./marketer-dashboard.component.css'],
})
export class MarketerDashboardComponent implements OnInit {
  allOrders: any;
  successOrders: any;
  ordersShipped: any;
  ordersUnderProcess: any;
  canceledOrderd: any;
  profit: any;
  allBalance: any;
  loading = true;

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.as
      .getLoggedUserAllInfo(localStorage.getItem('userToken'))
      .subscribe((res: any) => {
        console.log(res);
        this.allOrders = res.body.allOrders;
        this.successOrders = res.body.ordersFinished;
        this.ordersShipped = res.body.ordersShipped;
        this.ordersUnderProcess = res.body.ordersUnderProcess;
        this.canceledOrderd = res.body.cancelledOrders;
        this.profit = res.body.profit;
        this.allBalance = res.body.AvailableBalance;
        this.loading = false;
      });
  }
}
