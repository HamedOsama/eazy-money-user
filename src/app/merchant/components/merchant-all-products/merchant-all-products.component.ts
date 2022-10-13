import { environment } from './../../../../environments/environment.prod';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryResponse } from '../../../helper/modals/category.modal';
import {
  ProductData,
  ProductResponse,
} from '../../../helper/modals/product.modal';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserModel } from '../../../helper/modals/user.model';
import { GeneralProductsService } from 'src/app/helper/services/general-products.service';
import { MerchantProductsService } from 'src/app/helper/services/merchant-products.service';
@Component({
  selector: 'app-merchant-all-products',
  templateUrl: './merchant-all-products.component.html',
  styleUrls: ['./merchant-all-products.component.css'],
  providers: [NgbRatingConfig],
})
export class MerchantAllProductsComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  loading: boolean;
  waiting: boolean;
  displayedColumns: string[] = [
    'id',
    'image',
    'name',
    'category',
    'description',
    'properties',
    'price',
    // 'seller',
    'rate',
    'numOfReviews',
    // new component to display review on all product
    // 'reviews',
    'total_amount',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  token = localStorage.getItem('userToken');
  closeResult = '';
  subscription: Subscription = new Subscription();
  allCategory: any;
  allProducts: ProductData[];
  allSellers: any;
  productLength: any;
  paginationObject = {
    page: 1,
    limit: 10,
  };

  file: File | any = null; // Variable to store file
  thumbnail: any;
  productData!: ProductData | any;
  productReviews: any[];
  deletedProduct: any;
  editedProduct: any;
  selectedSeller!: UserModel | any;
  imageRoot = environment.apiRootImage;
  imgPath: any = null;
  selectedImage: any = null;
  productProperties: any[] = [];
  shipping_price: any[] = [];
  sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'];
  selectedProductStatus: any;

  files: any;

  productStatus: any;
  Object = Object;
  productShippingPrice: any;
  productId: any;
  productOriginalPrice: any;
  productSellPrice: any;
  constructor(
    private modalService: NgbModal,
    private toast: ToastrService,
    private gps: GeneralProductsService,
    private mps: MerchantProductsService,
    private config: NgbRatingConfig
  ) {
    this.loading = false;
    this.waiting = false;

    // Assign the data to the data source for the table to render
    this.allProducts = [];
    this.dataSource = new MatTableDataSource(this.allProducts);

    this.config.max = 5;
    this.config.readonly = true;

    this.productReviews = [];
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getYourOwnProducts(this.paginationObject, this.token);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Get All Categories
  getAllCategories() {
    this.loading = true;
    this.subscription.add(
      this.gps.getAllCategories().subscribe({
        next: (res: CategoryResponse | any) => {
          if (res.message === 'succeeded') {
            this.allCategory = res.body;
          }
          this.loading = false;
        },
        error: (err) => {
          this.toast.error(err?.error);

          this.loading = false;
        },
      })
    );
  }

  // Get All Products
  getYourOwnProducts(pagination: any, token: any) {
    this.waiting = true;
    this.subscription.add(
      this.mps.getYourOwnProducts(pagination, token).subscribe({
        next: (res: ProductResponse | any) => {
          console.log(res);
          this.allProducts = res?.data;
          this.dataSource = new MatTableDataSource(this.allProducts);
          this.productLength = res?.totalLength;
          this.shipping_price = res.data[0].shipping_price;
          this.waiting = false;
        },
        error: (err) => {
          this.toast.error(err?.error?.message);
          this.waiting = false;
        },
      })
    );
  }

  // Get All Sellers
  // getAllSellers() {
  //   this.subscription.add(
  //     this.userService.getAllSellers().subscribe({
  //       next: (res: any) => {
  //         this.allSellers = res?.data;
  //       },
  //       error: (err) => {
  //         this.toast.error(err?.error?.message);
  //       },
  //     })
  //   );
  // }

  // Get Product Details By Modal
  productDetails(productData: any) {
    this.productData = productData;
  }

  showPreview(event: any) {
    this.files = event.target.files;
    this.selectedImage = <File>event.target.files;
  }

  addProperity(color: any, size: any, amount: any) {
    let properity = {
      color: color,
      size: size,
      amount: amount,
    };
    this.productProperties.push(properity);
  }
  removeProperity(index: number) {
    this.productProperties.splice(index, 1);
  }

  updateShippingPrice(gov: any, price: any) {
    this.shipping_price[gov] = price;
    this.toast.success(`تم تعديل سعر شحن محافظة ${gov}`);
  }

  addProduct(data: any) {
    const fd = new FormData();
    for (let i = 0; i < this.selectedImage.length; i++) {
      fd.append('avatar', this.selectedImage[i], this.selectedImage[i].name);
    }

    const productModel = {
      name: data?.name,
      originalPrice: data?.originalPrice,
      category: data?.category,
      description: data?.description,
      properties: this.productProperties,
      shipping_price: this.shipping_price,
    };

    console.log(productModel);

    this.subscription.add(
      this.mps.addProduct(productModel, this.token).subscribe({
        next: (res: any) => {
          this.toast.success('تم اضافة المنتج بنجاح');
          this.getYourOwnProducts(this.paginationObject, this.token);
        },
        error: (err) => {
          this.toast.error(err?.error?.message, 'خطأ في اضافة المنتج');
        },
      })
    );
  }

  // ##### Edit Product
  // Edit Product
  removeImage(index: any) {
    this.files.splice(index, 1);
  }
  getProductToEdit(data: any) {
    this.editedProduct = data;
    this.productProperties = this.editedProduct.properties;
    this.shipping_price = data.shipping_price;
    this.files = data?.image;
  }
  editProduct(id: any, data: any) {
    console.log(data);
    this.waiting = true;

    const fd = new FormData();
    for (let i = 0; i < this.selectedImage?.length; i++) {
      fd.append('avatar', this.selectedImage[i], this.selectedImage[i].name);
    }

    const productModel = {
      image: '',
      name: data?.name,
      originalPrice: data?.originalPrice,
      category: data?.category,
      description: data?.description,
      properties: this.productProperties,
      shipping_price: this.shipping_price,
    };

    if (Object.keys(fd).length === 0) {
      productModel.image = this.editedProduct?.image;
    }

    // console.log(productModel);

    this.subscription.add(
      this.mps.updateProduct(id, productModel, this.token).subscribe({
        next: (res: any) => {
          if (res) {
            this.mps.updateProduct(id, fd, this.token).subscribe({
              next: (res: any) => {
                this.toast.success('تم تعديل المنتج بنجاح', 'تعديل منتج ');
                this.getYourOwnProducts(this.paginationObject, this.token);
                this.waiting = false;
              },
              error: (err) => {
                this.toast.error(err?.error?.message);
                this.waiting = false;
              },
            });
          }
        },
        error: (err) => {
          this.toast.error(err?.error?.message);
          this.waiting = false;
        },
      })
    );
  }

  // ##### Delete Product
  // Delete Product
  getProductToDelete(data: any) {
    this.deletedProduct = data;
  }

  deleteProduct() {
    console.log(this.deletedProduct);
    this.waiting = true;
    this.subscription.add(
      this.mps.deleteProduct(this.deletedProduct._id, this.token).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toast.success('تم حذف المنتج بنجاح', 'حذف منتج ');
          this.getYourOwnProducts(this.paginationObject, this.token);
          this.waiting = false;
        },
        error: (err) => {
          this.toast.error(err?.error?.message);
          this.waiting = false;
        },
      })
    );
  }

  // ##### Filters
  // Filters Of Product [Category | Name | Seller]
  filterByCategory(filterTerm: any) {
    this.waiting = true;
    // console.log(filterTerm);
    if (filterTerm === undefined) {
      this.getYourOwnProducts(this.paginationObject, this.token);
    } else {
      this.subscription.add(
        this.gps.filterProductsByCategory(filterTerm).subscribe({
          next: (res: any) => {
            this.allProducts = res?.data;
            this.dataSource = this.allProducts;
            this.productLength = res?.data?.length;
            // console.log(this.productLength);

            this.waiting = false;
          },
          error: (err) => {
            this.toast.error(err?.error?.message);

            this.waiting = false;
          },
        })
      );
    }
  }
  filterByName(filterTerm: any) {
    this.waiting = true;
    // console.log(filterTerm);
    if (filterTerm === undefined || filterTerm == '' || filterTerm == ' ') {
      this.getYourOwnProducts(this.paginationObject, this.token);
    } else if (filterTerm === null) {
      this.waiting = false;

      return;
    } else {
      this.subscription.add(
        this.gps.filterProductsByName(filterTerm).subscribe({
          next: (res: any) => {
            this.allProducts = res?.data;
            this.dataSource = this.allProducts;
            this.productLength = res?.data?.length;
            // console.log(this.productLength);

            this.waiting = false;
          },
          error: (err) => {
            this.toast.error(err?.error?.message);

            this.waiting = false;
          },
        })
      );
    }
  }

  // ##### Pagination Setting
  onPageChange(ev: any) {
    // console.log(ev);
    this.paginationObject.page = +ev.pageIndex + 1;
    this.getYourOwnProducts(this.paginationObject, this.token);
  }

  // ##### Modals
  // Handel Modal popup
  open(content: any, data?: any, size?: any) {
    if (data) {
      this.productReviews = data;
      // console.log(this.productReviews);
    }

    if (typeof data === 'object') {
      this.productId = data?._id;
      this.productStatus = data?.status;
      this.productShippingPrice = data?.shipping_price;
      this.productOriginalPrice = data?.originalPrice;
      this.productSellPrice = data?.sellPrice;
    }

    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: size ? size : '',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  // close Modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.files = [];
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.files = [];
      return 'by clicking on a backdrop';
    } else {
      this.files = [];
      return `with: ${reason}`;
    }
  }

  // When Leave Product Page
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
