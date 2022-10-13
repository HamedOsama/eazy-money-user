import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-marketer-order-timeline',
  templateUrl: './marketer-order-timeline.component.html',
  styleUrls: ['./marketer-order-timeline.component.css'],
})
export class MarketerOrderTimelineComponent implements OnInit {
  loading = true;
  order: any;
  constructor(
    private route: ActivatedRoute,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.mainService.setTitleAndMeta('تابع حالة طلبك', '');
    this.mainService
      .getOrederById(
        this.route.snapshot.paramMap.get('id'),
        localStorage.getItem('userToken')
      )
      .subscribe((res: any) => {
        console.log(res.body);
        this.order = res.body;
        this.loading = false;
      });
  }
}
