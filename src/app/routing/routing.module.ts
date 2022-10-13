import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from '../shared/components/general-products/all-products/all-products.component';
import { HomeComponent } from '../sales-website/components/home/home.component';
import { AboutUsComponent } from '../sales-website/components/about-us/about-us.component';
import { ContactUsComponent } from '../sales-website/components/contact-us/contact-us.component';
import { TermsConditionsComponent } from '../sales-website/components/terms-conditions/terms-conditions.component';
import { FaqQuestionsComponent } from '../sales-website/components/faq-questions/faq-questions.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { SalesWebsiteViewComponent } from '../sales-website/components/sales-website-view/sales-website-view.component';
import { ProductDetailsComponent } from '../shared/components/general-products/product-details/product-details.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { SignupComponent } from '../auth/components/signup/signup.component';
import { ForgetPasswordComponent } from '../auth/components/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../auth/components/reset-password/reset-password.component';
import { MarketerViewComponent } from '../marketer/components/marketer-view/marketer-view.component';
import { MarketerProfileComponent } from '../marketer/components/marketer-profile/marketer-profile.component';
import { MarketerAddRequestsComponent } from '../marketer/components/marketer-add-requests/marketer-add-requests.component';
import { MarketerBalanceComponent } from '../marketer/components/marketer-balance/marketer-balance.component';
import { MarketerBalanceHistoryComponent } from '../marketer/components/marketer-balance-history/marketer-balance-history.component';
import { MarketerOrderTimelineComponent } from '../marketer/components/marketer-order-timeline/marketer-order-timeline.component';
import { MarketerAllOrdersComponent } from '../marketer/components/marketer-all-orders/marketer-all-orders.component';
import { MarketerDashboardComponent } from '../marketer/components/marketer-dashboard/marketer-dashboard.component';
import { UnAuthGuard } from '../helper/guards/un-auth.guard';
import { MerchantViewComponent } from '../merchant/components/merchant-view/merchant-view.component';
import { MerchantDashboardComponent } from '../merchant/components/merchant-dashboard/merchant-dashboard.component';
import { MerchantProfileComponent } from '../merchant/components/merchant-profile/merchant-profile.component';
import { MerchantGuard } from '../helper/guards/merchant.guard';
import { MarketerGuard } from '../helper/guards/marketer.guard';
import { MerchantAllProductsComponent } from '../merchant/components/merchant-all-products/merchant-all-products.component';
import { MerchantOrdersComponent } from '../merchant/components/merchant-orders/merchant-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'sales-website', pathMatch: 'full' },
  {
    path: 'sales-website',
    component: SalesWebsiteViewComponent,
    canActivate: [UnAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home-page',
        pathMatch: 'full',
      },
      {
        path: 'home-page',
        component: HomeComponent,
      },
      { path: 'all-products', component: AllProductsComponent },
      {
        path: 'product-details/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'contact-us',
        component: ContactUsComponent,
      },
      {
        path: 'terms-conditions',
        component: TermsConditionsComponent,
      },
      { path: 'faq-questions', component: FaqQuestionsComponent },
    ],
  },
  {
    path: 'auth',
    canActivate: [UnAuthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
      },
    ],
  },
  {
    path: 'buyer',
    component: MarketerViewComponent,
    canActivate: [MarketerGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MarketerDashboardComponent },
      { path: 'all-products', component: AllProductsComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'profile', component: MarketerProfileComponent },
      { path: 'add-order/:id', component: MarketerAddRequestsComponent },
      { path: 'all-orders', component: MarketerAllOrdersComponent },
      { path: 'order/:id/timeline', component: MarketerOrderTimelineComponent },
      { path: 'balance', component: MarketerBalanceComponent },
      { path: 'balance-history', component: MarketerBalanceHistoryComponent },
    ],
  },
  {
    path: 'seller',
    component: MerchantViewComponent,
    canActivate: [MerchantGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MerchantDashboardComponent },
      { path: 'profile', component: MerchantProfileComponent },
      { path: 'all-products', component: AllProductsComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      {
        path: 'all-private-products',
        component: MerchantAllProductsComponent,
      },
      { path: 'all-orders', component: MerchantOrdersComponent },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class RoutingModule {}
