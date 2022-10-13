import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-marketer-balance-history',
  templateUrl: './marketer-balance-history.component.html',
  styleUrls: ['./marketer-balance-history.component.css'],
})
export class MarketerBalanceHistoryComponent implements AfterViewInit {
  displayedColumns: string[] = [
    '_id',
    'withdrawnAmount',
    'state',
    'transactionId',
    'createdAt',
    'totalBalance',
    'balanceAfterWithdrawn',
  ];
  dataSource: any;
  loading = true;
  listLength: any;
  token = localStorage.getItem('userToken');
  paginationObject = {
    page: 1,
    limit: 10,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private mainService: MainService) {
    this.mainService.setTitleAndMeta('سجل السحب', '');
  }

  ngAfterViewInit() {
    this.getUserTransactions(this.token, this.paginationObject);
  }

  getUserTransactions(token: any, paginationObj: any) {
    this.mainService
      .getUserTransactions(token, paginationObj)
      .subscribe((response: any) => {
        this.dataSource = new MatTableDataSource(response.data);
        this.listLength = response.totalLength;
        this.loading = false;
      });
  }

  onPageChange(ev: any) {
    this.loading = true;
    this.paginationObject.page = +ev.pageIndex + 1;
    this.getUserTransactions(this.token, this.paginationObject);
  }
}
