import { Injectable, OnInit } from '@angular/core';
import { StockService } from './stock.service';

@Injectable({ providedIn: 'root' })
export class StockListManagerService implements OnInit {
  constructor(private readonly stockService: StockService) {}

  public ngOnInit(): void {}

  public addSymbolToList(symbolCode: string): void {
    this.stockService.getStock(symbolCode).subscribe({
      next: (stockSymbol) => {
        console.log(stockSymbol);
      },
      error: () =>
        console.log(
          'There has been an error while fetching the information about the stock: ' +
            symbolCode
        ),
    });
    console.log(symbolCode);
  }
}
