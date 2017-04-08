import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/primeng';
import { User } from '../data-objects/user';

@Component({
  selector: 'go-live-date',
  templateUrl: './go-live-date.component.html',
  styleUrls: ['./go-live-date.component.scss']
})
export class GoLiveDateComponent implements OnInit {

  goLiveDate: Date;
  currentUser: User;
  goLiveClass: string;

  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.goLiveDate = new Date(this.currentUser.GoLiveDate);
    this.goLiveClass = this.goLiveDate > new Date() ? 'active' : '';
  }

}
