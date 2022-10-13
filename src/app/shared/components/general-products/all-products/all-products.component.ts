import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
// import { MainService } from '../../../services/main.service';
import { GeneralProductsService } from 'src/app/helper/services/general-products.service';
import { AuthService } from 'src/app/helper/services/auth.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  user: any;
  allProducts: any;
  allCategory: any;
  imageRoot = env.apiRoot;
  filterListedName: any[] = [];
  filterBy: any;
  loadingData = true;
  value: any;
  cartItems: any[] = [];
  totalAmount: any;
  paginationObject = {
    page: 1,
    limit: 300,
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

  constructor(private gps: GeneralProductsService, private as: AuthService) {}

  ngOnInit() {
    this.as.user.subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
    this.getAllProduct(this.paginationObject);
    this.getAllCategories();
  }

  // Function to get all Product
  getAllProduct(pagination: any) {
    this.gps.getAllProducts(pagination).subscribe({
      next: (res: any) => {
        this.allProducts = res?.body;
        this.productLength = res?.totalLength;
        this.loadingData = false;
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
    this.loadingData = true;
    // console.log(filterTerm);
    if (filterTerm === undefined) {
      this.getAllProduct(this.paginationObject);
    } else {
      this.subscription.add(
        this.gps.filterProductsByCategory(filterTerm).subscribe({
          next: (res: any) => {
            this.allProducts = res?.body;
            this.loadingData = false;
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
    this.loadingData = true;
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
