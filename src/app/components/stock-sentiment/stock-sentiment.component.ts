import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.css'],
})
export class StockSentimentComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly stockService: StockService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('symbol');
    console.log(id);
    this.stockService.getStockSentiment(id, '2020-03-15', '2020-08-15');
  }
}
