import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from 'src/app/shared/services/main.service';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';

export interface Iorders {
  _id: number;
  name: string;
  phone: string;
  createdAt: Date;
  city: string;
  orderTimeline: string;
}

@Component({
  selector: 'app-marketer-all-orders',
  templateUrl: './marketer-all-orders.component.html',
  styleUrls: ['./marketer-all-orders.component.css'],
  providers: [NgbActiveModal, NgbModal],
})
export class MarketerAllOrdersComponent implements OnInit {
  @Input() name: any;

  token = localStorage.getItem('userToken');
  displayedColumns: string[] = [
    '_id',
    'name',
    'phone',
    'createdAt',
    'city',
    'orderState',
    'orderTimeline',
  ];
  dataSource: any;
  closeResult = '';
  order: any;
  product: any;
  lodaing = true;
  modalLoading = true;
  quantity = 0;
  price = 0;
  totalPrice = 0;
  listLength: any;
  paginationObject = {
    page: 1,
    limit: 10,
  };

  constructor(
    private mainService: MainService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.mainService.setTitleAndMeta('تابع طلباتك', '');
    this.getAllOrders(this.token, this.paginationObject);
  }

  getAllOrders(token: any, paginationObj: any) {
    this.mainService
      .getAllOrders(token, paginationObj)
      .subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response.body);
        this.listLength = response.totalLength;
        this.lodaing = false;
      });
  }

  onPageChange(ev: any) {
    this.lodaing = true;
    this.paginationObject.page = +ev.pageIndex + 1;
    this.getAllOrders(this.token, this.paginationObject);
  }

  filter(input: any) {
    input.value = input.value.trim();
    input.value = input.value.toLowerCase();
    this.dataSource.filter = input.value;
  }

  open(content: any, order: any) {
    this.order = order;
    console.log(order);
    this.quantity = 0;
    order.orderItems.forEach((item: any) => {
      this.quantity += item.quantity;
    });

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
