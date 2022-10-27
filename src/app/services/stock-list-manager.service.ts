import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StockSymbol } from '../models/stock-symbol';
import { StockService } from './stock.service';

@Injectable({ providedIn: 'root' })
export class StockListManagerService implements OnInit {
  private stockSymbolsMap = new Map<string, StockSymbol>();
  private stockSymbolsMapSubject = new BehaviorSubject<
    ReadonlyMap<string, StockSymbol>
  >(this.readonlyStockSymbolsMap);

  constructor(private readonly stockService: StockService) {
    const codes = JSON.parse(localStorage.getItem('stockSymbolCodes')) || [];
    codes.forEach((code: string) => this.addSymbolToList(code));
  }

  public ngOnInit(): void {}

  public stockSymbolsMapObservable(): Observable<
    ReadonlyMap<string, StockSymbol>
  > {
    return this.stockSymbolsMapSubject.asObservable();
  }

  public addSymbolToList(symbolCode: string): void {
    if (!this.stockSymbolsMap.has(symbolCode)) {
      this.stockSymbolsMap.set(symbolCode, undefined);
      this.notifyMapChanges();
      this.updateLocalStorage();

      this.stockService.getStock(symbolCode).subscribe({
        next: (stockSymbol) => {
          if (!!stockSymbol.currentPrice) {
            this.stockSymbolsMap.set(symbolCode, stockSymbol);
            this.notifyMapChanges();
          }
        },
        error: () =>
          console.log(
            'There has been an error while fetching the information about the stock: ' +
              symbolCode
          ),
      });
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem(
      'stockSymbolCodes',
      JSON.stringify([...this.stockSymbolsMap.keys()])
    );
  }

  private get readonlyStockSymbolsMap(): ReadonlyMap<string, StockSymbol> {
    return this.stockSymbolsMap;
  }

  private notifyMapChanges(): void {
    this.stockSymbolsMapSubject.next(this.readonlyStockSymbolsMap);
  }
}
