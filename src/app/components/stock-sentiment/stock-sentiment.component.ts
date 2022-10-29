import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.css'],
})
export class StockSentimentComponent implements OnInit {
  private date = new Date();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly stockService: StockService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('symbol');
    console.log(id);
    const from =
      this.date.getFullYear() + '-' + '05' + '-' + this.date.getDate();
    const to =
      this.date.getFullYear() +
      '-' +
      this.date.getMonth().toString().padStart(2, '0') +
      '-' +
      this.date.getDate();
    console.log(from);
    this.stockService.getStockSentiment(id, from, to);
  }
}
