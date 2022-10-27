import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly configURL: string =
    'https://finnhub.io/api/v1/quote?symbol=AAPL&token=bu4f8kn48v6uehqi3cqg';
  private readonly apiToken = 'bu4f8kn48v6uehqi3cqg';

  constructor(private readonly http: HttpClient) {
    this.getStockByCode('apple');
  }

  public getStockByCode(symbolCode: string): any {
    const params = new HttpParams()
      .set('symbol', symbolCode)
      .set('token', this.apiToken);
    const request =
      this.configURL + 'quote?symbol=' + symbolCode.toUpperCase() + '&token';
    console.log(this.http.get(this.configURL, { params }));
  }
}
