import { Component, OnInit } from '@angular/core';
// import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUsComponent implements OnInit {
  data: any;
  showLoading: boolean = false;
  subscription: any;

  ngOnInit(): void {
    // this.mainService.setTitleAndMeta('من نحن', '');
  }
}
