import { Injectable, OnInit } from '@angular/core';
import { StockSymbol } from '../models/stock-symbol';
import { StockService } from './stock.service';

@Injectable({ providedIn: 'root' })
export class StockListManagerService implements OnInit {
  public stockSymbolsMap: Map<string, StockSymbol>;

  constructor(private readonly stockService: StockService) {
    this.stockSymbolsMap = new Map<string, StockSymbol>();

    const codes = JSON.parse(localStorage.getItem('stockSymbolCodes')) || [];
    console.log(codes);
    codes.forEach((code: string) => this.addSymbolToList(code));
  }

  public ngOnInit(): void {}

  public addSymbolToList(symbolCode: string): void {
    this.stockSymbolsMap.set(symbolCode, undefined);
    this.updateLocalStorage();

    this.stockService.getStock(symbolCode).subscribe({
      next: (stockSymbol) => {
        if (!!stockSymbol.currentPrice) {
          this.stockSymbolsMap.set(symbolCode, stockSymbol);
        }
      },
      error: () =>
        console.log(
          'There has been an error while fetching the information about the stock: ' +
            symbolCode
        ),
    });
    console.log(symbolCode);
  }

  private updateLocalStorage(): void {
    localStorage.setItem(
      'stockSymbolCodes',
      JSON.stringify([...this.stockSymbolsMap.keys()])
    );
  }
}
