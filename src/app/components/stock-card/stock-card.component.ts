import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { filter, take } from 'rxjs';
import { StockSymbol } from '../../models/stock-symbol';
import { StockListManagerService } from '../../services/stock-list-manager.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css'],
})
export class StockCardComponent implements OnInit {
  @Input()
  public symbolCode: string;

  public stockSymbol: StockSymbol;
  public fetchCompleted: boolean = false;

  constructor(
    private readonly stockListManagerService: StockListManagerService
  ) {}

  ngOnInit() {
    this.stockListManagerService
      .fetchCompletedObserable()
      .pipe(filter((code: string) => code === this.symbolCode))
      .subscribe(() => {
        this.stockSymbol = this.stockListManagerService.getStockFromMap(
          this.symbolCode
        );
        this.fetchCompleted = true;
      });
  }
}
