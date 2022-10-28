import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { StockSymbol } from '../../models/stock-symbol';
import { StockListManagerService } from '../../services/stock-list-manager.service';

@Component({
  selector: 'app-stock-card-list',
  templateUrl: './stock-card-list.component.html',
  styleUrls: ['./stock-card-list.component.css'],
})
export class StockCardListComponent implements OnInit {
  public symbolCodes: string[];

  constructor(
    private readonly stockListManagerSerivce: StockListManagerService
  ) {
    this.stockListManagerSerivce
      .symbolCodesObservable()
      .subscribe((codes: string[]) => {
        this.symbolCodes = codes;
      });
  }

  ngOnInit() {}
}
