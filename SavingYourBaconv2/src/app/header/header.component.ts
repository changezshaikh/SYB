import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthenticationService]
})
export class HeaderComponent implements OnInit {

  

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    
  }

  logout(){
    this.authService.logout();
  }

}
