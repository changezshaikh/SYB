import { Component, OnInit } from '@angular/core';

import { Income } from '../data-objects/income';

import { IncomeService } from '../services/income-service.service';

declare var $:any;

@Component({
  selector: 'income-overview',
  templateUrl: './income-overview.component.html',
  styleUrls: ['./income-overview.component.scss'],
  providers: [IncomeService]
})
export class IncomeOverviewComponent implements OnInit {

  errorMessage: string;
  income: Income[];
  mode = 'Observable';
  userId = 1000;

  constructor(private incomeService: IncomeService) {

  }

  ngOnInit() {
      this.getIncome();
  }

  getIncome(){
      this.incomeService.getIncome(this.userId)
                        .subscribe(data => this.income = data,
                                    error =>  this.errorMessage = <any>error);
  }

}
