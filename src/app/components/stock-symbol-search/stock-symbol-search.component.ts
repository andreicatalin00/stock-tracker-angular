import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { StockListManagerService } from '../../services/stock-list-manager.service';

@Component({
  selector: 'app-stock-symbol-search',
  templateUrl: './stock-symbol-search.component.html',
  styleUrls: ['./stock-symbol-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockSymbolSearchComponent implements OnInit {
  public symbolCodeControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(5),
    Validators.pattern('^[a-zA-Z]+$'),
  ]);

  constructor(
    private readonly stockListManagerService: StockListManagerService
  ) {}

  ngOnInit(): void {}

  public trackSymbol(): void {
    this.stockListManagerService.addSymbolToList(
      this.symbolCodeControl.value.toUpperCase()
    );
  }
  public getErrorMessage(): string {
    console.log(this.symbolCodeControl.errors);
    if (this.symbolCodeControl.hasError('maxlength')) {
      return 'Should have maximum 5 letters';
    } else if (this.symbolCodeControl.hasError('pattern')) {
      return 'Should have only letters';
    }
    return 'Should have minimum 1 letter';
  }
}
