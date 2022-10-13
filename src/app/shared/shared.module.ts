import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitingComponent } from './components/waiting/waiting.component';
import { RouterModule } from '@angular/router';
import { CheckUpperDirective } from './validators/check-upper.directive';
import { CheckLowerDirective } from './validators/check-lower.directive';
import { CheckSymbolDirective } from './validators/check-symbol.directive';
import { CheckNumberDirective } from './validators/check-number.directive';

import { FormsModule } from '@angular/forms';

import { SelectComponent } from './components/select/select.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllProductsComponent } from './components/general-products/all-products/all-products.component';
import { ProductCardComponent } from './components/general-products/product-card/product-card.component';
import { MaterialsModule } from '../materials/materials.module';
import { ProductDetailsComponent } from './components/general-products/product-details/product-details.component';

@NgModule({
  declarations: [
    WaitingComponent,
    CheckUpperDirective,
    CheckLowerDirective,
    CheckSymbolDirective,
    CheckNumberDirective,
    AllProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    SelectComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule,
    MaterialsModule,
  ],
  exports: [
    WaitingComponent,
    CheckUpperDirective,
    CheckLowerDirective,
    CheckSymbolDirective,
    CheckNumberDirective,
    SelectComponent,
    ProductCardComponent,
  ],
})
export class SharedModule {}
