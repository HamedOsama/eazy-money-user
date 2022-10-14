import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { GeneralProductsService } from 'src/app/helper/services/general-products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [NgbRatingConfig],
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  data: any = {};
  loading: boolean = false;
  shippingPrice: any = {};
  imageRoot = environment.apiRootImage;
  isDisplayData: boolean = false;
  isDisplayShippingPrice: boolean = false;
  images: any;
  @ViewChild('ngcarousel', { static: true }) ngCarousel!: NgbCarousel;
  image1: any;
  userRole: any;

  constructor(
    private route: ActivatedRoute,
    private rouetr: Router,
    private gps: GeneralProductsService,
    private config: NgbRatingConfig
  ) {
    // this.id = this.route.snapshot.paramMap.get('id')
    // console.log(this.id);
    this.config.max = 5;
    this.config.readonly = true;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
    });
    // this.getProduct()
    this.getProduct(this.id);
    this.userRole = localStorage.getItem('userRole');
  }

  getProduct(id: any) {
    this.loading = true;
    this.gps.getProductById(id).subscribe({
      next: (res: any) => {
        if (res.message === 'succeeded') {
          this.data = res.body;
          this.shippingPrice = res.body.shipping_price;
          this.images = this.data?.image;
          this.image1 = res?.body.image[0];
          console.log(this.image1);

          console.log(this.data);
          console.log(this.shippingPrice);
          console.log(this.images);
        }
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  toggleCardData() {
    this.isDisplayData = !this.isDisplayData;
  }

  toggleShippingData() {
    this.isDisplayShippingPrice = !this.isDisplayShippingPrice;
    this.isDisplayData = !this.isDisplayData;
  }

  navigateToSlide(item: any) {
    this.ngCarousel.select(item);
    console.log(item);
  }
  // Move to previous slide
  getToPrev() {
    this.ngCarousel.prev();
  }
  // Move to next slide
  goToNext() {
    this.ngCarousel.next();
  }
  // Pause slide
  stopCarousel() {
    this.ngCarousel.pause();
  }
  // Restart carousel
  restartCarousel() {
    this.ngCarousel.cycle();
  }

  routeToAllProducts() {
    if (!this.userRole) {
      this.rouetr.navigate(['sales-website/all-products']);
    } else {
      this.rouetr.navigate([`${this.userRole}/all-products`]);
    }
  }
}
