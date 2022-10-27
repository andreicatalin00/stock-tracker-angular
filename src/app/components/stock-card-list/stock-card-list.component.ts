import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { StockSymbol } from '../../models/stock-symbol';
import { StockListManagerService } from '../../services/stock-list-manager.service';

@Component({
  selector: 'app-stock-card-list',
  templateUrl: './stock-card-list.component.html',
  styleUrls: ['./stock-card-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockCardListComponent implements OnInit {
  public stocksMap: ReadonlyMap<string, StockSymbol>;

  constructor(
    private stockListManagerSerivce: StockListManagerService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.stocksMap = new Map<string, StockSymbol>();

    this.stockListManagerSerivce
      .stockSymbolsMapObservable()
      .subscribe((map: ReadonlyMap<string, StockSymbol>) => {
        this.stocksMap = map;
        this.changeDetectorRef.markForCheck();
        console.log(map.keys());
      });
  }

  ngOnInit() {}
}
