import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSymbolSearchComponent } from './stock-symbol-search.component';

describe('StockSymbolSearchComponent', () => {
  let component: StockSymbolSearchComponent;
  let fixture: ComponentFixture<StockSymbolSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSymbolSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSymbolSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
