import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
export class ProductCardComponent implements OnInit {
  @Input() data: any = {};
  @Input() userRole: any;
  @Output() item = new EventEmitter();
  addCartBtn: boolean = false;
  productData: ProductData | any;
  imageRoot = environment.apiRootImage;

  constructor(private router: Router) {}

  ngOnInit() {}

  addItem() {
    this.item.emit(this.data);
    this.addCartBtn = true; // To hide button from card if you add it in cart list
  }

  // Get Product Details By Modal
  productDetails(productData: any) {
    this.productData = productData;
  }

  openProductdDetails(id: any) {
    if (!this.userRole) {
      this.router.navigate(['sales-website/product-details/' + id]);
    } else {
      this.router.navigate([this.userRole + '/product-details/' + id]);
    }
  }
}
