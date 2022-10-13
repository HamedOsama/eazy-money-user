import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SalesWebsiteViewComponent } from './components/sales-website-view/sales-website-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { FaqQuestionsComponent } from './components/faq-questions/faq-questions.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialsModule } from '../materials/materials.module';

@NgModule({
  declarations: [
    SalesWebsiteViewComponent,
    NavbarComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    TermsConditionsComponent,
    FaqQuestionsComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    MaterialsModule,
  ],
  exports: [NavbarComponent, FooterComponent],
})
export class SalesWebsiteModule {}
