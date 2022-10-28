import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StockSymbol } from '../models/stock-symbol';
import { StockService } from './stock.service';

@Injectable({ providedIn: 'root' })
export class StockListManagerService implements OnInit {
  private symbolCodes: string[] = [];
  private stockSymbolsMap = new Map<string, StockSymbol>();
  private symbolCodesSubject: BehaviorSubject<string[]> = new BehaviorSubject(
    []
  );
  private fetchCompleted: Subject<string> = new Subject();

  constructor(private readonly stockService: StockService) {
    this.symbolCodes =
      JSON.parse(localStorage.getItem('stockSymbolCodes')) || [];
    this.symbolCodes.forEach((code: string) => this.addSymbolToMap(code));
    this.symbolCodesSubject.next(this.symbolCodes);
  }

  public ngOnInit(): void {}

  public symbolCodesObservable(): Observable<string[]> {
    return this.symbolCodesSubject.asObservable();
  }

  public fetchCompletedObserable(): Observable<string> {
    return this.fetchCompleted.asObservable();
  }

  public getStockFromMap(symbolCode: string): StockSymbol {
    if (this.stockSymbolsMap.has(symbolCode)) {
      return this.stockSymbolsMap.get(symbolCode);
    }
    return null;
  }

  public addSymbolToList(symbolCode: string): void {
    if (this.symbolCodes.indexOf(symbolCode) == -1) {
      this.symbolCodes.unshift(symbolCode);
      this.updateLocalStorage();
      this.symbolCodesSubject.next(this.symbolCodes);

      this.addSymbolToMap(symbolCode);
    }
  }

  private addSymbolToMap(symbolCode: string): void {
    this.stockService.getStock(symbolCode).subscribe({
      next: (stockSymbol) => {
        if (!!stockSymbol.currentPrice) {
          this.stockSymbolsMap.set(symbolCode, stockSymbol);
        } else {
          this.stockSymbolsMap.set(symbolCode, undefined);
        }
        this.fetchCompleted.next(symbolCode);
      },
      error: () => {
        console.log(
          'There has been an error while fetching the information about the stock: ' +
            symbolCode
        );
        this.fetchCompleted.next(symbolCode);
      },
    });
  }

  private updateLocalStorage(): void {
    localStorage.setItem('stockSymbolCodes', JSON.stringify(this.symbolCodes));
  }
}
