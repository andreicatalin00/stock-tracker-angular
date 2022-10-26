import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";

import {AppComponent} from './app.component';
import {StockSymbolSearchComponent} from './components/stock-symbol-search/stock-symbol-search.component';

@NgModule({
    imports: [BrowserModule, FormsModule, MatInputModule, MatIconModule],
    declarations: [AppComponent, StockSymbolSearchComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
