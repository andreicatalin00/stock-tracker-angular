import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-stock-symbol-search',
  templateUrl: './stock-symbol-search.component.html',
  styleUrls: ['./stock-symbol-search.component.css'],
})
export class StockSymbolSearchComponent implements OnInit {
  public symbolCodeControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(5),
    Validators.pattern('^[a-zA-Z]+$'),
  ]);

  ngOnInit(): void {}

  public trackSymbol(): void {
    console.log(this.symbolCodeControl.value);
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
