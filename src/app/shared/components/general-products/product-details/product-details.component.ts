import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { environment } from 'src/environments/environment.prod';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralProductsService } from 'src/app/helper/services/general-products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [NgbRatingConfig],
})

export class ProductDetailsComponent implements OnInit {
  id: any
  data: any = {}
  loading: boolean = false
  shippingPrice: any = {}
  imageRoot = environment.apiRootImage;
  isDisplayData: boolean = false;
  isDisplayShippingPrice: boolean = false;
  images: any
  @ViewChild('ngcarousel', { static: true }) ngCarousel!: NgbCarousel;
  image1: any;
  closeResult = '';
  currentImage: any;
  userRole: any;

  constructor(
    private route: ActivatedRoute,
    private prdServices: GeneralProductsService,
    private config: NgbRatingConfig,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {

    // this.id = this.route.snapshot.paramMap.get('id')
    // console.log(this.id);
    this.config.max = 5;
    this.config.readonly = true;

  }

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      console.log(this.id);

    })
    // this.getProduct()
    this.getProduct(this.id)
  }

  changeImage(image: any) {
    this.currentImage = image;

  }

  // Handel Modal popup
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  getProduct(id: any) {
    this.loading = true
    this.prdServices.getProductById(id).subscribe({
      next: (res: any) => {
        if (res.message === 'succeeded') {
          this.data = res.body;
          console.log(this.data);
          this.shippingPrice = res.body.shipping_price
          this.images = this.data?.image
          this.image1 = res?.body.image[0]
          console.log(this.image1)

          console.log(this.data);
          console.log(this.shippingPrice);
          console.log(this.images)

        }
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);

      },
    })
  }

  toggleCardData() {
    this.isDisplayData = !this.isDisplayData
  }

  toggleShippingData() {
    this.isDisplayShippingPrice = !this.isDisplayShippingPrice
    this.isDisplayData = !this.isDisplayData
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
}
