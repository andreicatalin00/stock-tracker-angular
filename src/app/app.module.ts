import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { StockSymbolSearchComponent } from './components/stock-symbol-search/stock-symbol-search.component';
import { HttpClientModule } from '@angular/common/http';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { StockCardListComponent } from './components/stock-card-list/stock-card-list.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { StockSentimentComponent } from './components/stock-sentiment/stock-sentiment.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    StockSymbolSearchComponent,
    StockCardComponent,
    StockCardListComponent,
    HomeComponent,
    StockSentimentComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
