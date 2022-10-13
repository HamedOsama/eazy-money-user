import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-Select',
  templateUrl: './Select.component.html',
  styleUrls: ['./Select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() data: any[] = [];
  @Output() selectOptVal = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  detectChanges(event: any) {
    this.selectOptVal.emit(event);
  }
}
