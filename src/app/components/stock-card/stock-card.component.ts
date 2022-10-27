import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockCardComponent implements OnInit {
  @Input()
  public stockSymbol: any[];

  public loadTimeout = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    setTimeout(() => {
      this.loadTimeout = true;
      this.changeDetectorRef.detectChanges();
    }, 5000);
  }

  ngOnInit() {}
}
