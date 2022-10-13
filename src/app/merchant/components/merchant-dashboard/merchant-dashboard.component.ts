import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/helper/services/auth.service';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css'],
})
export class MerchantDashboardComponent implements OnInit {
  allProducts: any;
  successProducts: any;
  canceledProducts: any;
  totalStock: any;
  allOrders: any;
  ordersFinished: any;
  loading = true;

  constructor(private as: AuthService) {}

  ngOnInit(): void {
    this.as
      .getLoggedUserAllInfo(localStorage.getItem('userToken'))
      .subscribe((res: any) => {
        console.log(res);
        this.allProducts = res.body.allProducts;
        this.successProducts = res.body.ordersFinished;
        this.canceledProducts = res.body.cancelledOrders;
        this.totalStock = res.body.totalStock;
        this.allOrders = res.body.allOrders;
        this.ordersFinished = res.body.ordersFinished;
        this.loading = false;
      });
  }
}
