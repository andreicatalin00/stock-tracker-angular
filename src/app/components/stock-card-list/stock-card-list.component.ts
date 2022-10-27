import { Component, OnInit } from '@angular/core';
import { StockSymbol } from '../../models/stock-symbol';
import { StockListManagerService } from '../../services/stock-list-manager.service';

@Component({
  selector: 'app-stock-card-list',
  templateUrl: './stock-card-list.component.html',
  styleUrls: ['./stock-card-list.component.css'],
})
export class StockCardListComponent implements OnInit {
  public readonly stocksMap: Map<string, StockSymbol>;

  constructor(private stockListManagerSerivce: StockListManagerService) {
    this.stocksMap = this.stockListManagerSerivce.stockSymbolsMap;
  }

  ngOnInit() {}
}
