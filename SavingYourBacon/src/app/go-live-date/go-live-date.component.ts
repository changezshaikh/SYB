import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/primeng';

@Component({
  selector: 'go-live-date',
  templateUrl: './go-live-date.component.html',
  styleUrls: ['./go-live-date.component.scss']
})
export class GoLiveDateComponent implements OnInit {

  goLiveDate: string;

  constructor() { }

  ngOnInit() {
  }

}
