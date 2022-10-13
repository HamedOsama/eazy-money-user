import { Component, OnInit } from '@angular/core';
// import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  marketerActive = true;
  merchantActive = false;

  ngOnInit(): void {
    // this.mainService.setTitleAndMeta('الرئيسية', '');
  }
}
