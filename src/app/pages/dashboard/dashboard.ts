import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Balance, BalanceRaw } from '../../interfaces/balance';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    CurrencyPipe,
    MatTableModule,
    DatePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  balance?: Balance;
  count?: number;
  sales :any = {
    recharges: [],
    pins: [],
    services: []
  };
  generalSales : Array<any> = [];
  dataSource = [];
  displayedColumns: string[] = ['transactionId', 'amount', 'date', 'type' ];
  firstDay ?: Date;
  lastDay ?: Date;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    lastValueFrom(this.http.get<BalanceRaw>(`${environment.apiUrl}/balances`))
    .then((result : BalanceRaw) => {
      let balance : Balance = {
        rechargeBalance: parseFloat(result.rechargeBalance),
        sms: parseFloat(result.sms),
        servicesBalance: parseFloat(result.servicesBalance)
      }
      this.balance = balance;
    }).catch((err) => {
      console.log(err);
    });

    let id = window.localStorage.getItem('id');
    lastValueFrom(this.http.get<Array<any>>(`${environment.apiUrl}/balances/${id}`))
    .then((sales) => {
      let date = new Date(Date.now() + 6 * 60 * 60 * 1000); // Ajuste de 6 horas

      // Primer día del mes (00:00:00)
      this.firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

      // Último día del mes (23:59:59.999)
      this.lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );

      this.generalSales =  sales;
      for(let sale of sales){
        switch(sale.type){
          case 'recharge':
            this.sales.recharges.push(sale);
            break;
          case 'pin':
            this.sales.pins.push(sale);
            break;
          case 'service':
            this.sales.services.push(sale);
            break;
        }
      }
    }).catch((err) => {
      console.log(err);
    });

    lastValueFrom(this.http.get<number>(`${environment.apiUrl}/balances/${id}/count`))
    .then((result: number) => {
      this.count = result;
    }).catch((err) => {
      console.log(err);
    });
  }
}
