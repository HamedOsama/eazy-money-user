import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { SalesWebsiteModule } from './sales-website/sales-website.module';
import { ToastrModule } from 'ngx-toastr';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthModule } from './auth/auth.module';
import { MarketerModule } from './marketer/marketer.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MerchantModule } from './merchant/merchant.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    RoutingModule,
    SharedModule,
    SalesWebsiteModule,
    AuthModule,
    MarketerModule,
    MerchantModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
