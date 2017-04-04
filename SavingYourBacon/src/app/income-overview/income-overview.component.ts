import { Component, OnInit } from '@angular/core';

import { Income } from '../data-objects/income';

import { IncomeService } from '../services/income-service.service';

declare var $:any;
declare var pleaseWait:any;

@Component({
  selector: 'income-overview',
  templateUrl: './income-overview.component.html',
  styleUrls: ['./income-overview.component.scss'],
  providers: [IncomeService]
})
export class IncomeOverviewComponent implements OnInit {

  errorMessage: string;
  income: Income[] = [];
  mode = 'Observable';
  userId = 1000;

  constructor(private incomeService: IncomeService) {

  }

  ngOnInit() {
    // var loading_screen = pleaseWait({
    //   logo: "assets/images/pathgather.png",
    //   backgroundColor: '#27ae60',
    //   loadingHtml: "<div class='sk-spinner sk-spinner-wave'><div class='sk-rect1'></div><div class='sk-rect2'></div><div class='sk-rect3'></div><div class='sk-rect4'></div><div class='sk-rect5'></div></div>"
    // });
    this.getIncome();
  }

  getIncome(){
      this.incomeService.getIncome(this.userId)
                        .subscribe(data => this.income = data,
                                    error =>  this.errorMessage = <any>error);
  }

}
