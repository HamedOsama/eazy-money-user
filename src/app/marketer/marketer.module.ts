import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketerViewComponent } from './components/marketer-view/marketer-view.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketerProfileComponent } from './components/marketer-profile/marketer-profile.component';
import { MarketerAddRequestsComponent } from './components/marketer-add-requests/marketer-add-requests.component';

import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MarketerAllOrdersComponent } from './components/marketer-all-orders/marketer-all-orders.component';
import { MarketerBalanceHistoryComponent } from './components/marketer-balance-history/marketer-balance-history.component';
import { MarketerBalanceComponent } from './components/marketer-balance/marketer-balance.component';
import { MarketerOrderTimelineComponent } from './components/marketer-order-timeline/marketer-order-timeline.component';
import { MarketerDashboardComponent } from './components/marketer-dashboard/marketer-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MarketerAllOrdersChartsComponent } from './components/marketer-charts-component/marketer-all-orders-charts/marketer-all-orders-charts.component';
import { MarketerSuccessOrdersChartsComponent } from './components/marketer-charts-component/marketer-success-orders-charts/marketer-success-orders-charts.component';

import { MarketerBalanceChartsComponent } from './components/marketer-charts-component/marketer-balance-charts/marketer-balance-charts.component';
import { MarketerRejectedOrdersChartsComponent } from './components/marketer-charts-component/marketer-rejected-orders-charts/marketer-rejected-orders-charts.component';
import { MaterialsModule } from '../materials/materials.module';

@NgModule({
  declarations: [
    MarketerViewComponent,
    MarketerProfileComponent,
    MarketerAddRequestsComponent,
    MarketerAllOrdersComponent,
    MarketerBalanceHistoryComponent,
    MarketerBalanceComponent,
    MarketerOrderTimelineComponent,
    MarketerDashboardComponent,
    MarketerAllOrdersChartsComponent,
    MarketerSuccessOrdersChartsComponent,
    MarketerBalanceChartsComponent,
    MarketerRejectedOrdersChartsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgbRatingModule,
    MaterialsModule,
  ],
  exports: [
    MarketerAllOrdersChartsComponent,
    MarketerSuccessOrdersChartsComponent,
    MarketerBalanceChartsComponent,
  ],
})
export class MarketerModule {}
