import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MerchantProductsService } from 'src/app/helper/services/merchant-products.service';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-merchant-orders',
  templateUrl: './merchant-orders.component.html',
  styleUrls: ['./merchant-orders.component.css'],
  providers: [NgbActiveModal, NgbModal],
})
export class MerchantOrdersComponent implements OnInit {
  displayedColumns: string[] = [
    '_id',
    'name',
    'properites',
    'totalQuantity',
    'createdAt',
    'state',
    'customerData',
    'shippingPrice',
    'totalPrice',
    'actions',
  ];
  dataSource: any;
  loading = true;
  listLength: any;
  token = localStorage.getItem('userToken');
  paginationObject = {
    page: 1,
    limit: 10,
  };
  chosenOrder: any;
  closeResult = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private mps: MerchantProductsService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    this.getAllOrders(this.token, this.paginationObject);
  }

  ngOnInit(): void {
    this.getAllOrders(this.token, this.paginationObject);
    // this.mps.getAllOrders(this.token).subscribe((res) => console.log(res));
  }

  getAllOrders(token: any, paginationObj: any) {
    this.mps.getAllOrders(token, paginationObj).subscribe((response: any) => {
      console.log(response);
      this.dataSource = new MatTableDataSource(response.body);
      this.listLength = response.totalLength;
      this.loading = false;
    });
  }

  onPageChange(ev: any) {
    this.loading = true;
    this.paginationObject.page = +ev.pageIndex + 1;
    this.getAllOrders(this.token, this.paginationObject);
  }

  open(content: any, order: any) {
    console.log(order);
    this.chosenOrder = order;

    this.modalService
      .open(content, { size: 'xl', windowClass: 'modal-xl' })
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
}
