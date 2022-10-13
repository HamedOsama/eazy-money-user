import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralProductsService } from 'src/app/helper/services/general-products.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment as env } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/helper/services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  product: any;
  loading = true;
  apiRootImage = env.apiRootImage;
  params: any;
  userRole: any;

  constructor(
    private route: ActivatedRoute,
    private gps: GeneralProductsService,
    private as: AuthService,
    private config: NgbRatingConfig
  ) {
    this.config.max = 5;
    this.config.readonly = true;
  }

  ngOnInit(): void {
    this.params = this.route.snapshot.paramMap;
    this.as.user.subscribe((res) => {
      this.userRole = res.role;
      this.getProductById(this.params.get('id'));
    });
  }

  getProductById(id: any) {
    this.gps.getProductById(id).subscribe((response: any) => {
      this.product = response.body;
      this.loading = false;
    });
  }
}
