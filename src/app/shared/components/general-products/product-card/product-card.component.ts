import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductData } from '../../../../helper/interfaces/product-data';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  providers: [NgbRatingConfig],
})
export class ProductCardComponent {
  @Input() data: any = {};
  @Input() userRole: any;
  @Output() item = new EventEmitter();
  addCartBtn: boolean = false;
  productData: ProductData | any;
  imageRoot = environment.apiRootImage;

  constructor(private router: Router) { }

  openProductdDetails(id: any) {
    console.log(id);
    if (!this.userRole) {
      this.router.navigate(['sales-website/product-details/' + id]);
    } else {
      this.router.navigate([this.userRole + '/product-details/' + id]);
    }
  }
}
