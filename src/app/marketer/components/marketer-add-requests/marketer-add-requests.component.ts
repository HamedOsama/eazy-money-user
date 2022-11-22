import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
// import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MainService } from 'src/app/shared/services/main.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-marketer-add-requests',
  templateUrl: './marketer-add-requests.component.html',
  styleUrls: ['./marketer-add-requests.component.css'],
  providers: [NgbRatingConfig],
})
export class MarketerAddRequestsComponent implements OnInit {
  // @ViewChild('errorRecord') private errorRecord!: SwalComponent;
  // @ViewChild('orderSuccessRecord') private orderSuccessRecord!: SwalComponent;
  @ViewChild('stepper') stepper!: MatStepper;

  productId: any;
  allProducts: any;
  product: any;
  apiRootImage = env.apiRootImage;
  customProperties: any = [];
  governorates: any = [];
  isLinear = false;
  totalQuantity: number = 0;
  orderFormModel: any = {};
  orderSent = false;
  newPrice: number = 0;
  shippingPrice = 0;
  totalPrice = 0;
  currentImage: any;

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    private router: Router,
    config: NgbRatingConfig,
    breakpointObserver: BreakpointObserver
  ) {
    config.max = 5;
    config.readonly = true;
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.mainService.setTitleAndMeta('اضافة طلب شراء جديد', '');
    this.mainService
      .getProductById(this.route.snapshot.paramMap.get('id'))
      .subscribe((res: any) => {
        this.product = res.body;
        for (let [index, [key, value]] of Object.entries(
          Object.entries(this.product.shipping_price)
        )) {
          if (Number(value) > 0) {
            this.governorates.push(key);
          }
        }
      });
  }

  changeImage(image: any) {
    this.currentImage = image;
  }

  fakeArray(length: number) {
    return Array(length);
  }

  returnNewPrice(price: any) {
    this.newPrice = +price.value;
  }

  propertiesFormSubmit(form: any) {
    this.totalQuantity = 0;
    for (let [index, [key, value]] of Object.entries(Object.entries(form))) {
      if (Number(value) > 0)
        this.customProperties.push({
          propertyId: this.product.properties[index]._id,
          quantity: Number(value),
          color: this.product.properties[index].color,
          size: this.product.properties[index].size,
        });
    }

    this.customProperties.forEach((property: any) => {
      this.totalQuantity += property.quantity;
    });

    if (this.totalQuantity > 0 && +this.newPrice > +this.product.sellPrice) {
      this.orderFormModel.orderItems = this.customProperties;
      this.stepper.next();
    } else if (this.totalQuantity <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'بيانات خاطئة',
        text: 'يجب ان تختار منتج واحد علي الاقل',
      });
      // this.errorRecord.text = 'يجب ان تختار منتج واحد علي الاقل';
      // this.errorRecord.fire();
    } else if (+this.newPrice <= +this.product.sellPrice) {
      Swal.fire({
        icon: 'error',
        title: 'بيانات خاطئة',
        text: 'سعر البيع يجب الا يقل عن السعر الحالي',
      });
      // this.errorRecord.text = 'سعر البيع يجب الا يقل عن السعر الحالي';
      // this.errorRecord.fire();
    }
  }

  customerDataFormSubmit(form: any) {
    for (let [key, value] of Object.entries(form)) {
      this.orderFormModel[key] = value;
    }
    this.shippingPrice = +this.product.shipping_price[this.orderFormModel.city];
    this.totalPrice =
      +this.totalQuantity * +this.newPrice + +this.shippingPrice;
    this.orderFormModel.sellPrice = this.product.sellPrice;
    this.orderFormModel.newPrice = this.newPrice;
    this.orderFormModel.productId = this.product._id;
    this.orderFormModel.shippingPrice = this.shippingPrice;
    this.orderFormModel.totalPrice = this.totalPrice;
  }

  orderFormSubmit() {
    this.orderSent = true;
    this.mainService
      .addOrder(this.orderFormModel, localStorage.getItem('userToken'))
      .subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: 'تم اضافة طلبك بنجاح',
        }).then(() => {
          this.router.navigate(['/buyer/all-products']);
        });
      });
  }
}
