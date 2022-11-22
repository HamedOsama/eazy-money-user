import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

import { MerchantViewComponent } from './components/merchant-view/merchant-view.component';
import { MerchantDashboardComponent } from './components/merchant-dashboard/merchant-dashboard.component';
import { MerchantProfileComponent } from './components/merchant-profile/merchant-profile.component';
import { MerchantAllProductsChartComponent } from './components/merchant-charts-components/merchant-all-products-chart/merchant-all-products-chart.component';
import { MerchantAllSuccessProductsChartComponent } from './components/merchant-charts-components/merchant-all-success-products-chart/merchant-all-success-products-chart.component';
import { MerchantAllRejectedProductsChartComponent } from './components/merchant-charts-components/merchant-all-rejected-products-chart/merchant-all-rejected-products-chart.component';
import { MerchantAllOrdersChartComponent } from './components/merchant-charts-components/merchant-all-orders-chart/merchant-all-orders-chart.component';
import { MerchantBalanceChartComponent } from './components/merchant-charts-components/merchant-balance-chart/merchant-balance-chart.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MerchantAllProductsComponent } from './components/merchant-all-products/merchant-all-products.component';
import { MerchantOrdersComponent } from './components/merchant-orders/merchant-orders.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    MerchantViewComponent,
    MerchantDashboardComponent,
    MerchantProfileComponent,
    MerchantAllProductsChartComponent,
    MerchantAllSuccessProductsChartComponent,
    MerchantAllRejectedProductsChartComponent,
    MerchantAllOrdersChartComponent,
    MerchantBalanceChartComponent,
    MerchantAllProductsComponent,
    MerchantOrdersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgbRatingModule,
    MaterialsModule,
    NgbModule,
    NgxDropzoneModule

  ],
  exports: [MerchantAllProductsChartComponent],
})
export class MerchantModule { }
