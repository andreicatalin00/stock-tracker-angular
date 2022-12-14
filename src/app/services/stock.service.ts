import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { StockSymbol } from '../models/stock-symbol';

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly configURL: string = 'https://finnhub.io/api/v1/';
  private readonly apiToken = 'bu4f8kn48v6uehqi3cqg';

  constructor(private readonly http: HttpClient) {}

  public getStock(symbolCode: string): Observable<StockSymbol> {
    return combineLatest([
      this.getDetailsByCode$(symbolCode),
      this.getStockByCode$(symbolCode),
    ]).pipe(
      map(([details, stock]) => {
        const stockSymbol: StockSymbol = {
          name: details?.result[0].description,
          currentPrice: stock.c,
          changePercent: stock.dp,
          openingPrice: stock.o,
          highPrice: stock.h,
        };
        return stockSymbol;
      })
    );
  }

  public getStockSentiment(symbolCode: string, from: string, to: string) {
    const params = new HttpParams()
      .set('symbol', symbolCode.toUpperCase())
      .set('from', from)
      .set('to', to)
      .set('token', this.apiToken);
    return this.http.get(this.configURL + 'stock/insider-sentiment', {
      params,
    });
  }

  public getStockByCode$(symbolCode: string): Observable<any> {
    const params = new HttpParams()
      .set('symbol', symbolCode.toUpperCase())
      .set('token', this.apiToken);
    return this.http.get(this.configURL + 'quote', { params });
  }

  public getDetailsByCode$(symbolCode: string): Observable<any> {
    const params = new HttpParams()
      .set('q', symbolCode.toUpperCase())
      .set('token', this.apiToken);

    return this.http.get(this.configURL + 'search', { params });
  }
}
