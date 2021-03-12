import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { CoinService } from '../coin.service';
import { Coin } from '../models';

@Component({
  selector: 'app-coin-dashboard',
  templateUrl: './coin-dashboard.component.html',
  styleUrls: ['./coin-dashboard.component.css']
})
export class CoinDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
/*       if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      } */

      return [
        { title: 'Card 1', cols: 2, rows: 1 }/* ,
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 } */
      ];
    })
  );

  globalData: {};
  coinData: {};
  route: string;
  selectedBaseCoin: number;
  selectedTargetCoin: number;
  amount: number;

  constructor(private breakpointObserver: BreakpointObserver, private coinService: CoinService, private router: Router) {}

  ngOnInit() {
    this.route = this.router.url;
    if (this.route === "/globaldata") {
      this.coinService.getGlobalData().subscribe(data => this.globalData = data);
    }

    if(this.route === "/converter"){
      this.coinService.getCoinList().subscribe(coins => {
        this.coinData = coins;
        console.log(this.coinData);
      });
    }
  }

  getGlobalData() {
    this.coinService.getGlobalData();
  }

  getSelectedBaseCoin(value){
    this.selectedBaseCoin = parseFloat(value.toString().split(':')[1]);
  }

  getSelectedTargetCoin(value){
    this.selectedTargetCoin = parseFloat(value.toString().split(':')[1]);
  }

  convertCoin(){
    return (this.selectedBaseCoin / this.selectedTargetCoin) * this.amount;
  }
}
