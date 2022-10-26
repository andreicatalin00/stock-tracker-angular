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
    Validators.minLength(1),
  ]);

  ngOnInit(): void {}

  public trackSymbol(): void {
    console.log(this.symbolCodeControl.value);
  }
}
