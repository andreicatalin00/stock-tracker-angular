import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-symbol-search',
  templateUrl: './stock-symbol-search.component.html',
  styleUrls: ['./stock-symbol-search.component.css']
})
export class StockSymbolSearchComponent implements OnInit {
  public value: string;
  constructor() { }

  ngOnInit(): void {
  }

}
