import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Balance, BalanceRaw } from '../../interfaces/balance';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    CurrencyPipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  balance?: Balance;

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
  }
}
