import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockSymbolSentiment } from '../../models/stock-symbol-sentiment';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.css'],
})
export class StockSentimentComponent implements OnInit {
  symbolCode: string;
  sentimentMap = new Map<number, StockSymbolSentiment>();
  sentimentData: StockSymbolSentiment[] = [];
  readonly month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  usedMonths: number[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly stockService: StockService
  ) {
    this.symbolCode = this.route.snapshot.paramMap.get('symbol');
  }

  ngOnInit() {
    const date = new Date();
    const dateFrom = new Date();

    const to =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate();

    this.usedMonths.push(date.getMonth());
    date.setMonth(date.getMonth() - 1);
    this.usedMonths.unshift(date.getMonth());
    date.setMonth(date.getMonth() - 1);
    this.usedMonths.unshift(date.getMonth());
    const monthFrom = date.getMonth();
    const from =
      date.getFullYear() +
      '-' +
      monthFrom.toString().padStart(2, '0') +
      '-' +
      date.getDate();

    this.stockService
      .getStockSentiment(this.symbolCode, from, to)
      .subscribe((data: any) => {
        this.sentimentData = data.data;
        this.usedMonths.forEach((mon) => {
          data.data.forEach((value: StockSymbolSentiment) => {
            if (value.month == mon + 1) {
              this.sentimentMap.set(mon, value);
            }
          });
        });
      });
  }
}
