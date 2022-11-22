import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralProductsService } from 'src/app/helper/services/general-products.service';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  allProducts: any;
  allCategory: any;
  userRole: any;
  filterListedName: any[] = [];
  filterBy: any;
  loadingData: boolean = true;
  value: any;
  cartItems: any[] = [];
  totalAmount: any;
  paginationObject = {
    page: 1,
    limit: 12,
  };
  productLength: any;
  subscription: Subscription = new Subscription();

  // Swipper
  // config: SwiperConfigInterface = {
  //   direction: 'horizontal',
  //   slidesPerView: 9,
  //   navigation: true,
  //   pagination: false,
  //   // autoplay: true,
  //   spaceBetween: 10,
  //   keyboard: true,
  //   scrollbar: false,
  //   loop: false,
  //   speed: 700,
  //   observer: true,
  //   observeParents: true,
  //   observeSlideChildren: true,
  //   breakpoints: {
  //     992: {
  //       slidesPerView: 9
  //     },
  //     576: {
  //       slidesPerView: 5
  //     },
  //     440: {
  //       slidesPerView: 3
  //     },
  //     300: {
  //       slidesPerView: 2
  //     }
  //   }
  // }

  constructor(private gps: GeneralProductsService) { }

  ngOnInit() {
    this.getAllProduct(this.paginationObject);
    this.getAllCategories();
    this.userRole = localStorage.getItem('userRole');
  }

  // Function to get all Product
  getAllProduct(pagination: any) {
    this.loadingData = true;
    this.gps.getAllProducts(pagination).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.message === 'succeeded') {
          this.allProducts = res?.body;
          this.productLength = res?.totalLength;
          this.loadingData = false;
        }
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Function to get all Category
  getAllCategories() {
    this.gps.getAllCategories().subscribe({
      next: (res: any) => {
        if (res.message === 'succeeded') {
          this.allCategory = res?.body;
        }
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // Filter Bu Name
  filterByName(filterTerm: any) {
    this.loadingData = true;
    // console.log(filterTerm);
    if (filterTerm === undefined || filterTerm == '' || filterTerm == ' ') {
      this.getAllProduct(this.paginationObject);
    } else if (filterTerm === null) {
      this.loadingData = false;

      return;
    } else {
      this.subscription.add(
        this.gps.filterProductsByName(filterTerm).subscribe({
          next: (res: any) => {
            this.allProducts = res?.body;
            // console.log(this.productLength);

            this.loadingData = false;
          },
          error: (err: any) => {
            console.log(err);
            this.loadingData = false;
          },
        })
      );
    }
  }

  // Filters Of Product [Category ]
  filterByCategory(filterTerm: any) {
    // console.log(filterTerm);
    if (filterTerm === undefined) {
      this.getAllProduct(this.paginationObject);
    } else {
      this.subscription.add(
        this.gps.filterProductsByCategory(filterTerm).subscribe({
          next: (res: any) => {
            this.allProducts = res?.body;
            console.log(this.allProducts);
          },
          error: (err: any) => {
            console.log(err);
          },
        })
      );
    }
  }

  // ##### Pagination Setting
  onPageChange(ev: any) {
    // console.log(ev);
    this.paginationObject.page = +ev.pageIndex + 1;
    this.getAllProduct(this.paginationObject);
  }

  addToCart(event: any) {
    console.log(event); //Card info
    // Check if there is cars in localStorage or not:
    if ('cart' in localStorage) {
      this.cartItems = JSON.parse(localStorage.getItem('cart')!);
      this.cartItems.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));

      // let existCard = this.cartItems.find(item => item.id == event.id)

      // if (existCard)
      // {
      //   alert('This Card Already exist in your cart')  //I can change it
      // }
      // else
      // {
      //   this.cartItems.push(event)
      //   localStorage.setItem("cart", JSON.stringify(this.cartItems))
      // }
    } else {
      this.cartItems.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }
}
